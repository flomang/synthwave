import { SIGN_IN } from "../_graphql/queries.js";
import { mutate } from "svelte-apollo";
import ApolloClient from "apollo-boost";

export async function post(req, res) {
  if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch')
  }

  const signin = req.body;
  const email = signin.email;
  const password = signin.password;
  const remember = signin.remember;

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });

  mutate(client, {
    mutation: SIGN_IN,
    variables: { email, password, remember }
  }).then(response => {
    res.setHeader('Content-Type', 'application/json');
    if (response.data && response.data.signin) {
      req.session.user = response.data.signin.user;
      req.session.token = response.data.signin.token;
    }

    res.end(JSON.stringify(response.data));
  }).catch(error => {
    res.end(JSON.stringify(error));
    //console.log("ERROR:", error);
  });
}