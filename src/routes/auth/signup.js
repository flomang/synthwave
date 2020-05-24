import { SIGN_UP } from "../_graphql/queries.js";
import { mutate } from "svelte-apollo";
import ApolloClient from "apollo-boost";

export async function post(req, res) {
  const user = req.body;
  const username = user.username;
  const email = user.email;
  const password = user.password;

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });

  mutate(client, {
    mutation: SIGN_UP,
    variables: { email, username, password }
  }).then(response => {
    res.setHeader('Content-Type', 'application/json');

    if (response.data && response.data.signup) {
      req.session.user = response.data.signup;
      res.end(JSON.stringify(response.data));
    }
  }).catch(error => {
    res.end(JSON.stringify(error));
    //console.log("ERROR:", error);
  });
}