<script>
  import { Label } from "@smui/fab";
  import Button from "@smui/button";
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
    <Button color="primary" on:click={() => alert('logout')} variant="raised">
      <Label>Logout</Label>
    </Button>
  </div>
</div>
