<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../_components/ListErrors.svelte";
  import { Icon as CommonIcon } from "@smui/common";
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";

  const { session } = stores();

  let username = "";
  let email = "";
  let password = "";
  let errors = null;

  async function submit(event) {
    //const response = await post(`auth/register`, { username, email, password });

    //// TODO handle network errors
    //errors = response.errors;

    //if (response.user) {
    //$session.user = response.user;
    $session.user = "flowy";
    goto("/");
    //}
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

        <ListErrors {errors} />

        <div>
          <Textfield bind:value={username} label="" type="input">
            <span slot="label">
              <CommonIcon
                class="material-icons"
                style="font-size: 1em; line-height: normal; vertical-align:
                middle;">
                face
              </CommonIcon>
              username
            </span>
          </Textfield>
        </div>
        <div>
          <Textfield bind:value={email} label="" type="email">
            <span slot="label">
              <CommonIcon
                class="material-icons"
                style="font-size: 1em; line-height: normal; vertical-align:
                middle;">
                email
              </CommonIcon>
              email
            </span>
          </Textfield>
        </div>
        <div>
          <Textfield bind:value={password} label="" type="password">
            <span slot="label">
              <CommonIcon
                class="material-icons"
                style="font-size: 1em; line-height: normal; vertical-align:
                middle;">
                lock
              </CommonIcon>
              password
            </span>
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
