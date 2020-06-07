<script>
  import { stores } from "@sapper/app";
  import { beforeUpdate, afterUpdate } from "svelte";
  import HelperText from "@smui/textfield/helper-text/index";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  //import Eliza from "elizabot";
  import { fade } from "svelte/transition";
  import { mutate, subscribe } from "svelte-apollo";
  import { POST_MESSAGE } from "../../_graphql/mutations.js";
  import { MESSAGE_POSTED } from "../../_graphql/subscriptions.js";
  import { MESSAGES } from "../../_graphql/queries.js";
  import { wsClient } from "../../_graphql/client.js";
  import { onMount } from "svelte";

  export let user;

  const { session } = stores();

  let comments = [];
  onMount(async () => {
    // get all messages
    let response = await wsClient(session).query({ query: MESSAGES });

    if (response.data && response.data.messages) {
      const messages = response.data.messages.reverse();

      messages.forEach(msg => {
        comments = comments.concat({
          username: msg.username,
          profileImage: msg.avatarURL ? msg.avatarURL : defaultAvatar,
          text: msg.text,
          type: "comment"
        });
      });
    }

    // subscribe to message posted
    wsClient(session)
      .subscribe({
        query: MESSAGE_POSTED,
        variables: { user: user.username }
      })
      .subscribe(result => {
        if (result.data.messagePosted) {
          const data = result.data.messagePosted;
          comments = comments.concat({
            username: data.username,
            profileImage: data.avatarURL ? data.avatarURL : defaultAvatar,
            text: data.text,
            type: "comment"
          });
        }
      });
  });

  //const eliza = new Eliza();
  let scrollableDiv;
  let textInput = "";
  let autoscroll;
  let scrollWidth = 0;
  let defaultAvatar = "aces.png";

  // let users = [
  //   { username: "eliza", profileImage: "great-success.png" },
  //   { username: "Troll King", profileImage: "troll-king.png" },
  //   { username: "jack", profileImage: "joker-cartoon.png" },
  //   { username: "9 of Hearts", profileImage: "card-9-hearts.png" },
  //   { username: "Satoshi Bum", profileImage: "btc.png" },
  //   { username: "porky pig", profileImage: "porky.png" },
  //   { username: "pillboi", profileImage: "pill.png" },
  //   { username: "doge bot", profileImage: "doge.png" },
  //   { username: "joker", profileImage: "joker-card.png" },
  //   { username: "luv child", profileImage: "hearts.png" },
  //   { username: "cannibis420", profileImage: "cannabis-512.png" }
  // ];

  // add random comments
  //let seed = eliza.getInitial();
  //for (let i = 0; i < 10; ++i) {
  //  const user = users[Math.floor(Math.random() * users.length)];
  //  comments = comments
  //    .filter(comment => !comment.placeholder)
  //    .concat({
  //      username: user.username,
  //      text: eliza.transform(seed),
  //      profileImage: user.profileImage,
  //      type: "comment-text"
  //    });
  //}
  let handleKeydown = event => {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;

      // FOR TEST
      // comments = comments.concat({
      //   username: user.username,
      //   profileImage: user.avatarURL ? user.avatarURL : defaultAvatar,
      //   text: text,
      //   type: "comment"
      // });
      mutate(wsClient($session), {
        mutation: POST_MESSAGE,
        variables: {
          input: {
            userID: user.id,
            username: user.username,
            text: text,
            avatarURL: user.avatarURL
          }
        }
      });

      scrollableDiv.scrollTo(0, scrollableDiv.scrollHeight);
      event.target.value = "";
      textInput = "";

      //setTimeout(() => {
      //  const reply = eliza.transform(text);
      //  const user = users[Math.floor(Math.random() * users.length)];
      //  comments = comments
      //    .filter(comment => !comment.placeholder)
      //    .concat({
      //      username: user.username,
      //      text: reply,
      //      profileImage: user.profileImage,
      //      type: "comment"
      //    });
      //}, 500 + Math.random() * 500);
    }
  };

  beforeUpdate(() => {
    autoscroll =
      (scrollableDiv &&
        scrollableDiv.offsetHeight + scrollableDiv.scrollTop >
          scrollableDiv.scrollHeight - 10);
  });

  afterUpdate(() => {
    if (autoscroll && scrollableDiv) {
      scrollableDiv.scrollTo(0, scrollableDiv.scrollHeight);
    }
  });
</script>

<style>
  .trollbox {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
    height: 700px;
    background-color: rgb(9, 9, 9);
    border-style: solid;
    border-width: 1px;
    border-color: rgb(0, 0, 0);
    position: relative;
  }

  .trollbox-header {
    color: #888;
    font-weight: bold;
    background-color: rgb(0, 0, 0);
    height: 50px;
    line-height: 50px;
  }

  .trollbox-header-title {
    margin-left: 1em;
    margin-right: 1em;
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
    background-color: rgb(0, 0, 0);
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
  .comment-bet-username {
    color: #888;
    font-weight: bold;
    padding-right: 0.3em;
  }

  .comment-text {
    margin-bottom: 1em;
    color: #fff;
  }

  .comment-bet {
    background-color: rgba(30, 30, 30);
    color: #fff;
    margin-bottom: 0.5em;
    width: 100%;
    position: relative;
  }

  .comment-bet-amount {
    float: right;
    padding-right: 0.3em;
    color: rgb(255, 237, 54);
    font-weight: bold;
  }

  .comment-bet-description {
    padding-left: 1em;
  }

  .dice-img {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
  }

  .dice-img-bet-slip {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
  }

  .selected {
    color: rgb(255, 237, 54);
  }

  .bets {
    width: 100%;
    text-align: left;
    background-color: rgb(9, 9, 9);
    border-style: solid;
    border-width: 1px;
    border-color: rgb(15, 15, 15);
    position: relative;
  }

  .bet-container {
    display: flex;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(15, 15, 15);
    width: 100%;
    position: relative;
    color: #fff;
  }
  .bet-take-container {
    display: flex;
    width: 100%;
    position: relative;
  }

  .bet-avatar {
    height: 30px;
    width: 30px;
    position: relative;
    top: -3px;
    margin-left: 0.5em;
    margin-top: 0.5em;
    margin-right: 0.5em;
  }

  .bet-slip {
    margin-top: 0.5em;
    margin-bottom: 1em;
    width: 100%;
    position: relative;
  }

  .comment-bet-username {
    color: rgb(255, 237, 54);
    font-weight: bold;
    padding-right: 0.3em;
  }

  .comment-bet-amount {
    float: right;
    padding-right: 0.3em;
    color: rgb(255, 237, 54);
    font-weight: bold;
  }

  .comment-bet-description {
    padding-left: 1em;
    color: #fff;
  }
</style>

<svelte:head>
  <title>trolling</title>
</svelte:head>

<div transition:fade>
  <div class="trollbox-scrollable" bind:this={scrollableDiv}>
    {#each comments as comment}
      <div class="comment-container">
        <div>
          <img class="comment-avatar" alt="" src={comment.profileImage} />
        </div>
        {#if comment.type == 'bet'}
          <div class="comment-bet">
            <span class="comment-bet-username">{comment.username}</span>
            <span class="comment-bet-amount">Bet: {comment.amount} sats</span>
            <div class="comment-bet-description">{comment.description}</div>
          </div>
        {:else}
          <div class="comment-text">
            <span class="comment-username">{comment.username}</span>
            <span>{comment.text}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="trollbox-input">
    <div>
      <img
        class="trollbox-input-profile"
        alt=""
        src={user.avatarURL ? user.avatarURL : defaultAvatar} />
    </div>
    <div class="trollbox-input-container">
      <span class="comment-username">{user.username}</span>
      <Textfield
        fullwidth
        bind:value={textInput}
        on:keydown={handleKeydown}
        label="Say something..."
        input$aria-controls="helper-text-standard-a"
        input$aria-describedby="helper-text-standard-a" />
      <img
        class="trollbox-input-btn"
        on:click={() => alert('insert emojiis')}
        alt=""
        src="emojii-joker.png" />
    </div>
  </div>
</div>
