import { SIGN_IN } from "../_graphql/queries.js";
import { getClient } from "../_graphql/client.js";
import { mutate } from "svelte-apollo";

export async function post(req, res) {
  try {
    const client = getClient(req);
    const signin = req.body;
    const response = await mutate(client, {
      mutation: SIGN_IN,
      variables: { email: signin.email, password: signin.password, remember: signin.remember }
    })

    if (response.data) {
      res.setHeader('Content-Type', 'application/json');
      if (response.data.signin) {
        req.session.user = response.data.signin.user;
        req.session.token = response.data.signin.token;
      }

      res.end(JSON.stringify(response.data));
    }
  } catch (err) {
    res.end(JSON.stringify(err));
  }
}