<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../_components/ListErrors.svelte";
  import { Icon as CommonIcon } from "@smui/common";
  import Textfield from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import FormField from "@smui/form-field";
  import Icon from "@smui/textfield/icon/index";
  import Button, { Label } from "@smui/button";
  import ApolloClient from "apollo-boost";
  import { getClient, setClient, mutate } from "svelte-apollo";
  import { post } from "utils.js";

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });
  setClient(client);

  const { session } = stores();
  let email = "";
  let password = "";
  let remember = false;
  let emailLabel = "email";
  let emailInvalid = false;
  let passwordLabel = "password";
  let passwordInvalid = false;
  let disableSubmit = false;

  let handleInput = () => {
    passwordLabel = "password";
    passwordInvalid = false;
    emailLabel = "email";
    emailInvalid = false;
  };

  async function submit(event) {
    const response = await post(`auth/signin`, { email, password, remember });

    if (response.message) {
      switch (true) {
        case response.message.includes("incorrect password/email"):
          passwordInvalid = true;
          passwordLabel = "you shall NOT pass!";
          emailInvalid = true;
          emailLabel = "nope,";
          break;
        case response.message.includes("email account not verified"):
          emailInvalid = true;
          emailLabel = "email unverified";
          break;
        default:
          console.log(response.message);
      }
    } else if (response.signin) {
      $session.user = response.signin.user;
      $session.token = response.signin.token;
      goto("/");
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
  .lds-ring {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    border: 4px solid #081e3e;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #081e3e transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .margins {
    margin: 5px 0px 3px;
  }
</style>

<svelte:head>
  <title>Sign in • joos</title>
</svelte:head>

<div class="content">
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
      on:keyup={handleInput}
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
      on:keyup={handleInput}
      label={passwordLabel}
      type="password">
      <Icon class="material-icons">lock</Icon>
    </Textfield>
  </div>
  <div class="margins">
    <FormField>
      <span slot="label">Remember me.</span>
      <Checkbox bind:checked={remember} />
    </FormField>
  </div>

  {#if !disableSubmit}
    <div>
      <Button
        action="submit"
        disabled={!email || !password || passwordInvalid || emailInvalid}
        on:click={submit}>
        <Label>sign in</Label>
      </Button>
    </div>
  {:else}
    <div class="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  {/if}
</div>
