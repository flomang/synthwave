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


polka()
	.use(bodyParser.json())
	.use(session({
		secret: 'conduit',
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
				user: req.session && req.session.user
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});