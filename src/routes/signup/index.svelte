<script>
  import { goto, stores } from "@sapper/app";
  import { getClient, setClient, mutate } from "svelte-apollo";
  import ApolloClient from "apollo-boost";
  import Icon from "@smui/textfield/icon/index";
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";
  import { SIGN_UP } from "../_graphql/queries.js";

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });
  setClient(client);

  const { session } = stores();

  let username = "";
  let email = "";
  let password = "";

  $: usernameErrors = "";
  $: emailErrors = "";

  let handleUsername = () => {
    usernameErrors = "";
  };
  let handleEmail = () => {
    emailErrors = "";
  };

  async function submit() {
    try {
      let reponse = await mutate(getClient(), {
        mutation: SIGN_UP,
        variables: { email, username, password }
      });

      const signup = reponse.data.signup;
      $session.user = signup.username;
      goto("/");
    } catch (error) {
      if (error.message.includes("users_username_key")) {
        usernameErrors = "username taken";
      } else if (error.message.includes("users_email_key")) {
        emailErrors = "email already registered";
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
  .margins {
    margin: 5px 0 3px;
    width: 100%;
  }
</style>

<svelte:head>
  <title>Sign up • joos</title>
</svelte:head>

<div class="content">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <a href="/signin">Have an account?</a>
        </p>

        <div class="margins">
          {#if usernameErrors != ''}
            <Textfield
              invalid
              withLeadingIcon
              variant="filled"
              bind:value={username}
              on:keyup={handleUsername}
              label="username taken">
              <Icon class="material-icons">face</Icon>
            </Textfield>
          {:else}
            <Textfield
              withLeadingIcon
              variant="filled"
              bind:value={username}
              label="username">
              <Icon class="material-icons">face</Icon>
            </Textfield>
          {/if}
        </div>

        <div class="margins">
          {#if emailErrors != ''}
            <Textfield
              invalid
              withLeadingIcon
              variant="filled"
              bind:value={email}
              on:keyup={handleEmail}
              label="email already registered"
              type="email">
              <Icon class="material-icons">email</Icon>
            </Textfield>
          {:else}
            <Textfield
              withLeadingIcon
              variant="filled"
              bind:value={email}
              type="email"
              label="email"
              input$autocomplete="email">
              <Icon class="material-icons">email</Icon>
            </Textfield>
          {/if}
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
    </div>
  </div>
</div>
