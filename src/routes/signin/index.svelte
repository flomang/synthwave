<script>
  import { goto, stores } from "@sapper/app";
  import ListErrors from "../_components/ListErrors.svelte";
  import { Icon as CommonIcon } from "@smui/common";
  import Textfield from "@smui/textfield";
  import Button, { Label } from "@smui/button";

  const { session } = stores();
  let email = "";
  let password = "";
  let errors = null;

  async function submit(event) {
    //const response = await post(`auth/login`, { email, password });
    //// TODO handle network errors
    //errors = response.errors;
    //if (response.user) {
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
	margin:0 auto;
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

        <ListErrors {errors} />

        <div>

          <Textfield bind:value={email} label="" type="email">
            <span slot="label">
              <CommonIcon
                class="material-icons"
                style="font-size: 1em; line-height: normal; vertical-align:
                middle;">
                email
              </CommonIcon>
              Email
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
              Password
            </span>
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
