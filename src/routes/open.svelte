<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import { goto } from "@sapper/app";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import Button, { Group, GroupItem } from "@smui/button";

  let description = "";
  let amount = "";
  let expiration = "";
</script>

<style>
  .content {
    background-color: #fff;
  }
</style>

<svelte:head>
  <title>Open Bet</title>
</svelte:head>

<div class="content" bp="padding">
  <h1>Open Bet</h1>
  <p>What are you betting on?</p>
  <div>
    <div bp="margin-bottom--lg">
      <div class="margins">
        <Textfield
          fullwidth
          textarea
          bind:value={description}
          label="Description"
          input$aria-controls="helper-text-fullwidth-textarea"
          input$aria-describedby="helper-text-fullwidth-textarea" />
      </div>
    </div>
    <div bp="grid 6 margin-bottom--lg">
      <Textfield
        variant="outlined"
        bind:value={amount}
        label="Amount"
        input$aria-controls="helper-text-outlined-a"
        input$aria-describedby="helper-text-outlined-a" />
    </div>
    <div bp="grid 6 margin-bottom--lg">
      <Textfield
        variant="outlined"
        bind:value={expiration}
        label="Expiration Date"
        input$aria-controls="helper-text-outlined-a"
        input$aria-describedby="helper-text-outlined-a" />
    </div>

    <Button color="primary" on:click={() => alert('submit')} variant="raised">
      <Label>Submit</Label>
    </Button>

  </div>
  <p>
    The rules are simple. Be fair and grade your own bets. If you can't agree on
    the outcome, you both loose. In the event that you both disagree, your wager
    will be donated to a charitable organization of our choosing.
  </p>
</div>
