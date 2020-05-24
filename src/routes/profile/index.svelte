<script context="module">
  // https://sapper.svelte.dev/docs/#this_redirect
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      return this.redirect(302, "signin");
    }

    return { user };
  }
</script>

<script>
  import { Label } from "@smui/fab";
  import Button from "@smui/button";
  import { goto, stores } from "@sapper/app";
  import { post } from "utils.js";

  const { session } = stores();
  export let user;

  async function logout() {
    await post(`auth/logout`);
    $session.user = null;
    goto("/");
  }
</script>

<style>
  div {
    text-align: center;
    margin: 0 auto;
  }

  .content {
    background-color: #fff;
  }
</style>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="content" bp="padding">
  <div>Profile</div>
  <div>
    <Button color="primary" on:click={logout} variant="raised">
      <Label>Logout</Label>
    </Button>
  </div>
</div>
