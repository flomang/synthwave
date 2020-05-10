<script>
  import Eliza from "elizabot";
  import { beforeUpdate, afterUpdate } from "svelte";
  import Fab, { Label } from "@smui/fab";
  import IconButton, { Icon } from "@smui/icon-button";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";

  let div;
  let autoscroll;
  let valueStandardA = "";
  let profileName = "Troll King";

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  const eliza = new Eliza();

  let comments = [
    { author: "eliza", text: eliza.getInitial(), image: "great-success.png" }
  ];

  function handleKeydown(event) {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;

      comments = comments.concat({
        author: profileName,
        image: "btc.png",
        text
      });

      event.target.value = "";

      const reply = eliza.transform(text);
      setTimeout(() => {
        comments = comments
          .filter(comment => !comment.placeholder)
          .concat({
            author: "eliza",
            text: reply,
            image: "great-success.png"
          });
      }, 500 + Math.random() * 500);
    }
  }
</script>

<style>
  .trollbox {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    text-align: left;
    height: 700px;
    background-color: #f9f9f9;
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    position: relative;
  }
  .trollbox-header {
    color: #888;
    font-weight: bold;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
  }
  .trollbox-input {
    background-color: #fff;
    height: 200px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
    align-items: left;
  }
  .trollbox-footer {
    text-align: center;
  }

  .trollbox-textfield {
    height: 100px;
    width: 600px;
  }

  .scrollable {
    margin: 0 0 0.5em 0;
    padding: 30px;
    overflow-y: auto;
    height: 450px;
    flex-direction: column-reverse;
  }

  article {
    margin: 0.5em 0;
  }

  .user {
    float: left;
    text-align: left;
  }

  span {
    padding: 0.5em 1em;
    display: inline-block;
  }

  .eliza span {
    float: left;
    text-align: left;
  }

  .user span {
    word-break: break-all;
  }

  .content {
    background-color: #fff;
    text-align: center;
    margin: 0 auto;
  }
  .chat-text {
    display: float;
  }

  .input-container {
    width: 100%;
    margin-left: 12px;
  }
  .input-container p {
    position: relative;
    top: 16px;
    width: 100%;
  }

  .avatar-icon {
    height: 30px;
    width: 30px;
    position: relative;
    top: 10px;
  }

  .avatar-image {
    position: relative;
    top: 16px;
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }
  .comment-author {
    color: #888;
    font-weight: bold;
    padding-right: 3px;
  }
</style>

<svelte:head>
  <title>trollbox</title>
</svelte:head>

<div class="content" bp="padding--lg">
  <div class="trollbox">
    <div class="trollbox-header">Trollbox</div>
    <div class="scrollable" bind:this={div}>
      {#each comments as comment}
        <div>
          <img class="avatar-icon" alt="" src={comment.image} />
          <span class="comment-author">{comment.author}</span>
          <span bp="padding-left--none">{comment.text}</span>
        </div>
      {/each}
    </div>
    <div class="trollbox-input">
      <img class="avatar-image" alt="" src="btc.png" />
      <div class="input-container">
        <p bp="margin-top--none" class="comment-author">{profileName}</p>
        <Textfield
          fullwidth
          bind:value={valueStandardA}
          on:keydown={handleKeydown}
          label="Say something..."
          input$aria-controls="helper-text-standard-a"
          input$aria-describedby="helper-text-standard-a" />
        <img
          class="avatar-image"
          on:click={() => alert('make bet')}
          alt=""
          src="btc-btn.png" />
        <img
          class="avatar-image"
          on:click={() => alert('insert emojiis')}
          alt=""
          src="mood.png" />
      </div>
    </div>
  </div>
</div>
