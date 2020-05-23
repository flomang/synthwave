<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../_components/ListErrors.svelte";
  import { Icon as CommonIcon } from "@smui/common";
  import Textfield from "@smui/textfield";
  import Icon from "@smui/textfield/icon/index";
  import Button, { Label } from "@smui/button";
  import ApolloClient from "apollo-boost";
  import { getClient, setClient, mutate } from "svelte-apollo";
  import { SIGN_IN } from "../_graphql/queries.js";

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });
  setClient(client);

  const { session } = stores();
  let email = "";
  let password = "";
  let remember = true;
  let emailLabel = "email";
  let emailInvalid = false;
  let passwordLabel = "password";
  let passwordInvalid = false;

  let handlePassword = () => {
    passwordLabel = "password";
    passwordInvalid = false;
  };
  let handleEmail = () => {
    emailLabel = "email";
    emailInvalid = false;
  };

  async function submit() {
    try {
      let response = await mutate(getClient(), {
        mutation: SIGN_IN,
        variables: { email, password, remember }
      });

      const signin = response.data.signin;
      $session.jwt = signin.jwt;
      $session.refresh = signin.refresh;
      goto("/");
    } catch (error) {
      switch (true) {
        case error.message.includes("incorrect password/email"):
          passwordInvalid = true;
          passwordLabel = "you shall NOT pass!";
          emailInvalid = true;
          emailLabel = "nope,";
          break;
        case error.message.includes("email account not verified"):
          emailInvalid = true;
          emailLabel = "email unverified";
          break;
      }
      console.log("TODO");
    }
  }
</script>

<style>
  .content {
    width: 300px;
    background-color: #fff;
    text-align: center;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>Sign in • joos</title>
</svelte:head>

<div class="content" bp="padding">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign In</h1>
        <p class="text-xs-center">
          <a href="/signup">Need an account?</a>
        </p>

        <div class="margins">
          <Textfield
            invalid={emailInvalid}
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
            invalid={passwordInvalid}
            withLeadingIcon
            variant="filled"
            bind:value={password}
            on:keyup={handlePassword}
            label={passwordLabel}
            type="password">
            <Icon class="material-icons">lock</Icon>
          </Textfield>
        </div>

        <Button
          action="submit"
          disabled={!email || !password}
          on:click={submit}>
          <Label>sign in</Label>
        </Button>
      </div>
    </div>
  </div>
</div>
