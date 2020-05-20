<script>
  import { Label } from "@smui/fab";
  import Button from "@smui/button";
  import { jwt } from "../stores/stores.js";
  import { goto } from "@sapper/app";

  let logout = () => {
    jwt.set("logout");
    goto('/space');
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
