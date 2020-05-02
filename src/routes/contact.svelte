<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import { goto } from "@sapper/app";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";
  import Button, { Group, GroupItem } from "@smui/button";

  let firstName = "";
  let lastName = "";
  let message = "";
</script>

<style>
  .content {
    background-color: #fff;
  }
</style>

<svelte:head>
  <title>Contact</title>
</svelte:head>

<div class="content" bp="padding">
  <h1>Contact Us</h1>
  <p>
    Please leave your name, email and any comments or questions you may have
    here and we’ll get back to you via email as soon as the next business day.
  </p>
  <div>
    <div bp="grid 6 margin-bottom--lg">
      <Textfield
        variant="outlined"
        bind:value={firstName}
        label="First Name"
        input$aria-controls="helper-text-outlined-a"
        input$aria-describedby="helper-text-outlined-a" />
      <Textfield
        variant="outlined"
        bind:value={lastName}
        label="Last Name"
        input$aria-controls="helper-text-outlined-a"
        input$aria-describedby="helper-text-outlined-a" />
    </div>
    <div bp="grid 6 margin-bottom--lg">
      <Textfield
        variant="outlined"
        bind:value={firstName}
        label="Email"
        input$aria-controls="helper-text-outlined-a"
        input$aria-describedby="helper-text-outlined-a" />
    </div>
    <div bp="margin-bottom--lg">
      <div class="margins">
        <Textfield
          fullwidth
          textarea
          bind:value={message}
          label="Message"
          input$aria-controls="helper-text-fullwidth-textarea"
          input$aria-describedby="helper-text-fullwidth-textarea" />
      </div>
    </div>

    <Button color="primary" on:click={() => alert("attach") } variant="raised">
      <Label>Attach File</Label>
    </Button>
    <Button color="primary" on:click={() => alert("submit") } variant="raised">
      <Label>Submit</Label>
    </Button>

  </div>

</div>
