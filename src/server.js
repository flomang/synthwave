import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import * as sapper from '@sapper/server';
import connectRedis from 'connect-redis';
import redis from 'redis';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({ host: '127.0.0.1', port: 6379 });

const logger = (req, res, next) => {
	console.log(`~> Received ${req.method} on ${req.url}`);
	next(); // move on
}

polka()
	.use(bodyParser.json())
	.use(logger)
	.use(session({
		secret: 'santa',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 31536000
		},
		store: new RedisStore({ client: redisClient })
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user,
				token: req.session && req.session.token
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});