import { SIGN_IN } from "../_graphql/queries.js";
import { client } from "../_graphql/client.js";
import { mutate } from "svelte-apollo";

export async function post(req, res) {
  const signin = req.body;
  const email = signin.email;
  const password = signin.password;
  const remember = signin.remember;

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