<script>
  import Eliza from "elizabot";
  import { beforeUpdate, afterUpdate } from "svelte";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text/index";

  let div;
  let autoscroll;
  let valueStandardA = "";

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  const eliza = new Eliza();

  let comments = [
    { author: "", text: "" },
    { author: "", text: "" },
    { author: "", text: "" },
    { author: "", text: "" },
    { author: "", text: "" },
    { author: "", text: "" },
    { author: "", text: "" },
    { author: "eliza", text: eliza.getInitial() }
  ];

  function handleKeydown(event) {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;

      comments = comments.concat({
        author: "user",
        text
      });

      event.target.value = "";

      const reply = eliza.transform(text);

      setTimeout(() => {
        comments = comments.concat({
          author: "eliza",
          text: "...",
          placeholder: true
        });

        setTimeout(() => {
          comments = comments
            .filter(comment => !comment.placeholder)
            .concat({
              author: "eliza",
              text: reply
            });
        }, 500 + Math.random() * 500);
      }, 200 + Math.random() * 200);
    }
  }
</script>

<style>
  .trollbox {
    display: flex;
    flex-direction: column;
    max-width: 30%;
    text-align: left;
    height: 700px;
    background-color: #f9f9f9;
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
  }
  .trollbox-header {
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
  }
  .trollbox-input {
    background-color: #fff;
    height: 70px;
    padding-left: 30px;
  }

  .scrollable {
    flex: 1 1 auto;
    border-top: 1px solid #eee;
    margin: 0 0 0.5em 0;
    overflow-y: auto;
  }

  article {
    margin: 0.5em 0;
  }

  .user {
    text-align: t;
  }

  span {
    padding: 0.5em 1em;
    display: inline-block;
  }

  .eliza span {
  }

  .user span {
    word-break: break-all;
  }

  .content {
    background-color: #fff;
    text-align: center;
    margin: 0 auto;
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
        <article class={comment.author}>
          <span>{comment.text}</span>
        </article>
      {/each}
    </div>
    <div class="trollbox-input">
      <Textfield
        bind:value={valueStandardA}
        on:keydown={handleKeydown}
        label="Say something..."
        input$aria-controls="helper-text-standard-a"
        input$aria-describedby="helper-text-standard-a" />
      <HelperText id="helper-text-standard-a" />
    </div>
  </div>
</div>
