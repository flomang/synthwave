import { SIGN_UP } from "../_graphql/queries.js";
import { mutate } from "svelte-apollo";
import ApolloClient from "apollo-boost";

export async function post(req, res) {
    if (typeof fetch !== 'function') {
        global.fetch = require('node-fetch')
    }

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
        if (response.data && response.data.signup) {
			req.session.user = response.data.signup;
		}
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
    }).catch( error => {
        console.log("ERROR");
    });

    // const signup = reponse.data.signup;
    //  $session.user = signup.username;
    //  goto("/");
    //} catch (error) {
    //  if (error.message.includes("users_username_key")) {
    //    invalidUsername = true;
    //    usernameLabel = "username taken";
    //  } else if (error.message.includes("users_email_key")) {
    //    invalidEmail = true;
    //    emailLabel = "email already registered";
    //  }
    //  console.log("TODO");
    //}
}