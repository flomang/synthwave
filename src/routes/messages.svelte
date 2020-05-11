<script>
  import Eliza from "elizabot";
  import { beforeUpdate, afterUpdate } from "svelte";
  import Textfield, { Input, Textarea } from "@smui/textfield";

  const eliza = new Eliza();
  let scrollableDiv;
  let autoscroll;
  let textInput = "";
  const profileName = "Joker";
  const profileImage = "joker-card.png";
  let comments = [];

  let users = [
    { username: "eliza", profileImage: "great-success.png" },
    { username: "Troll King", profileImage: "troll-king.png" },
    { username: "jack", profileImage: "joker-cartoon.png" },
    { username: "9 of Hearts", profileImage: "card-9-hearts.png" },
    { username: "Satoshi Bum", profileImage: "btc.png" },
    { username: "porky pig", profileImage: "porky.png" },
    { username: "pillboi", profileImage: "pill.png" },
    { username: "doge bot", profileImage: "doge.png" }
  ];

  // add random comments
  let seed = eliza.getInitial();
  for (let i = 0; i < 10; ++i) {
    const user = users[Math.floor(Math.random() * users.length)];
    comments = comments
      .filter(comment => !comment.placeholder)
      .concat({
        username: user.username,
        text: eliza.transform(seed),
        profileImage: user.profileImage
      });
  }

  beforeUpdate(() => {
    autoscroll =
      scrollableDiv &&
      scrollableDiv.offsetHeight + scrollableDiv.scrollTop >
        scrollableDiv.scrollHeight - 10;
  });

  afterUpdate(() => {
    if (autoscroll) scrollableDiv.scrollTo(0, scrollableDiv.scrollHeight);
  });

  let handleKeydown = event => {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;

      comments = comments.concat({
        username: profileName,
        profileImage: profileImage,
        text
      });

      event.target.value = "";

      setTimeout(() => {
        const reply = eliza.transform(text);
        const user = users[Math.floor(Math.random() * users.length)];
        comments = comments
          .filter(comment => !comment.placeholder)
          .concat({
            username: user.username,
            text: reply,
            profileImage: user.profileImage
          });
      }, 500 + Math.random() * 500);
    }
  };
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

  .trollbox-scrollable {
    width: 100%;
    position: absolute;
    top: 50px;
    margin: 0 0 0.5em 0;
    padding-left: 30px;
    overflow-y: auto;
    height: 450px;
  }

  .trollbox-input {
    background-color: #fff;
    height: 200px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    align-items: left;
    display: flex;
  }

  .trollbox-input-container {
    width: 100%;
    padding-top: 25px;
  }

  .trollbox-input-container p {
    position: relative;
    width: 100%;
  }

  .trollbox-input-profile {
    height: 30px;
    width: 30px;
    margin-top: 20px;
    margin-right: 1em;
  }

  .trollbox-input-btn {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    margin-top: 16px;
  }

  .comment-container {
    display: flex;
  }

  .comment-avatar {
    height: 30px;
    width: 30px;
    position: relative;
    top: -3px;
    margin-right: 1em;
  }

  .comment-username {
    color: #888;
    font-weight: bold;
    padding-right: 0.3em;
  }

  .comment-text {
    padding-bottom: 1em;
  }
</style>

<svelte:head>
  <title>trollbox</title>
</svelte:head>

<div class="content">
  <div class="trollbox">
    <div class="trollbox-header">Trollbox</div>
    <div class="trollbox-scrollable" bind:this={scrollableDiv}>
      {#each comments as comment}
        <div class="comment-container">
          <div>
            <img class="comment-avatar" alt="" src={comment.profileImage} />
          </div>
          <div class="comment-text">
            <span class="comment-username">{comment.username}</span>
            <span>{comment.text}</span>
          </div>
        </div>
      {/each}
    </div>
    <div class="trollbox-input">
      <div>
        <img class="trollbox-input-profile" alt="" src={profileImage} />
      </div>
      <div class="trollbox-input-container">
        <span class="comment-username">{profileName}</span>
        <Textfield
          fullwidth
          bind:value={textInput}
          on:keydown={handleKeydown}
          label="Say something..."
          input$aria-controls="helper-text-standard-a"
          input$aria-describedby="helper-text-standard-a" />
        <img
          class="trollbox-input-btn"
          on:click={() => alert('make bet')}
          alt=""
          src="btc-btn.png" />
        <img
          class="trollbox-input-btn"
          on:click={() => alert('insert emojiis')}
          alt=""
          src="joker.png" />
      </div>
    </div>
  </div>
</div>
