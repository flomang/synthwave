<script>
  import { goto, stores } from "@sapper/app";
  import { getClient, setClient, mutate } from "svelte-apollo";
  import ApolloClient from "apollo-boost";
  import Icon from "@smui/textfield/icon/index";
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  import { SIGN_UP } from "../_graphql/queries.js";
  import { post } from "utils.js";

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });
  setClient(client);

  const { session } = stores();

  let username = "";
  let email = "";
  let password = "";
  let usernameLabel = "username";
  let emailLabel = "email";
  let invalidUsername = false;
  let invalidEmail = false;

  let handleUsername = () => {
    usernameLabel = "username";
    invalidUsername = false;
  };
  let handleEmail = () => {
    emailLabel = "email";
    invalidEmail = false;
  };

  async function submit() {
    mutate(getClient(), {
      mutation: SIGN_UP,
      variables: { email, username, password }
    })
      .then(response => {
        const signup = response.data.signup;
        $session.user = signup;
        goto("/");
      })
      .catch(error => {
        if (error.message.includes("users_username_key")) {
          invalidUsername = true;
          usernameLabel = "username taken";
        } else if (error.message.includes("users_email_key")) {
          invalidEmail = true;
          emailLabel = "email already registered";
        } else {
          console.log(error);
        }
      });
  }

  // prototype
  //async function submit(event) {
  //  try {
  //    const response = await post(`auth/signup`, { username, email, password });
  //    console.log(response);

  //    // TODO handle network errors
  //    //errors = response.errors;

  //    if (response.user) {
  //      $session.user = response.user;
  //      goto("/");
  //    }
  //  } catch (error) {
  //    if (error.message.includes("users_username_key")) {
  //      invalidUsername = true;
  //      usernameLabel = "username taken";
  //    } else if (error.message.includes("users_email_key")) {
  //      invalidEmail = true;
  //      emailLabel = "email already registered";
  //    }
  //    console.log("TODO");
  //  }
  //}
</script>

<style>
  .content {
    width: 300px;
    background-color: #fff;
    text-align: center;
    margin: 0 auto;
  }
  .margins {
    margin: 5px 0px 3px;
  }
</style>

<svelte:head>
  <title>Sign up • joos</title>
</svelte:head>

<div class="content">
  <h1 class="text-xs-center">Sign up</h1>
  <p class="text-xs-center">
    <a href="/signin">Have an account?</a>
  </p>

  <div class="margins">
    <Textfield
      invalid={invalidUsername}
      withLeadingIcon
      variant="filled"
      bind:value={username}
      on:keyup={handleUsername}
      label={usernameLabel}>
      <Icon class="material-icons">face</Icon>
    </Textfield>
  </div>

  <div class="margins">
    <Textfield
      invalid={invalidEmail}
      withLeadingIcon
      variant="filled"
      bind:value={email}
      on:keyup={handleEmail}
      label={emailLabel}
      type="email">
      <Icon class="material-icons">email</Icon>
    </Textfield>
  </div>

  <div class="margins">
    <Textfield
      withLeadingIcon
      variant="filled"
      bind:value={password}
      type="password"
      label="password"
      input$aria-controls="helper-text-fullwidth-textarea"
      input$aria-describedby="helper-text-fullwidth-textarea">
      <Icon class="material-icons">lock</Icon>
    </Textfield>
  </div>
  <Button
    action="submit"
    disabled={!username || !email || !password}
    on:click={submit}>
    <Label>sign up</Label>
  </Button>
</div>
