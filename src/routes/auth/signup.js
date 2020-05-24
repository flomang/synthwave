import { SIGN_UP } from "../_graphql/queries.js";
import { getClient } from "../_graphql/client.js";
import { mutate } from "svelte-apollo";

export async function post(req, res) {
  try {
    const client = getClient(req);
    const user = req.body;
    const response = await mutate(client, {
      mutation: SIGN_UP,
      variables: { email: user.email, username: user.username, password: user.password }
    });

    res.setHeader('Content-Type', 'application/json');

    if (response.data && response.data.signup) {
      req.session.user = response.data.signup;
    }
    res.end(JSON.stringify(response.data));
  } catch (error) {
    res.end(JSON.stringify(error));
  }
}