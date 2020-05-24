<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import HelperText from "@smui/textfield/helper-text/index";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import Eliza from "elizabot";

  export let handleAddBet;
  const eliza = new Eliza();
  let comments = [];
  let scrollableDiv;
  let textInput = "";
  let autoscroll;
  let dialog;
  let description = "";
  let amount = "";
  let expiration = "";
  let disabled = true;
  let scrollWidth = 0;
  export let user;

  let users = [
    { username: "eliza", profileImage: "great-success.png" },
    { username: "Troll King", profileImage: "troll-king.png" },
    { username: "jack", profileImage: "joker-cartoon.png" },
    { username: "9 of Hearts", profileImage: "card-9-hearts.png" },
    { username: "Satoshi Bum", profileImage: "btc.png" },
    { username: "porky pig", profileImage: "porky.png" },
    { username: "pillboi", profileImage: "pill.png" },
    { username: "doge bot", profileImage: "doge.png" },
    { username: "joker", profileImage: "joker-card.png" },
    { username: "luv child", profileImage: "hearts.png" },
    { username: "cannibis420", profileImage: "cannabis-512.png" }
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
        profileImage: user.profileImage,
        type: "comment-text"
      });
  }

  let closeHandler = event => {
    if (event.detail.action == "submit") {
      //  console.log("submit the bet");
      comments = comments.concat({
        username: user.username,
        profileImage: user.avatarURL,
        description: description,
        amount: amount,
        timer: expiration,
        type: "bet"
      });

      let newBet = {
        username: user.username,
        profileImage: user.avatarURL,
        description: description,
        amount: amount,
        timer: expiration
      };
      handleAddBet(newBet);
    }

    amount = NaN;
    description = "";
  };

  let handleKeydown = event => {
    if (event.key === "Enter") {
      const text = event.target.value;
      if (!text) return;

      comments = comments.concat({
        username: user.username,
        profileImage: user.avatarURL,
        text: text,
        type: "comment"
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
            profileImage: user.profileImage,
            type: "comment"
          });
      }, 500 + Math.random() * 500);
    }
  };

  let handleOpenDialog = event => {
    disabled = true;
    dialog.open();
  };

  let handleInput = event => {
    if (isNaN(amount) || description == "") {
      disabled = true;
    } else if (!isNaN(amount) && description != "") {
      disabled = false;
    }

    if (isNaN(amount) || amount < 100) {
      disabled = true;
    }
  };

  beforeUpdate(() => {
    autoscroll =
      scrollableDiv &&
      scrollableDiv.offsetHeight + scrollableDiv.scrollTop >
        scrollableDiv.scrollHeight - 10;
  });

  afterUpdate(() => {
    if (autoscroll) scrollableDiv.scrollTo(0, scrollableDiv.scrollHeight);
  });
</script>

<style>
  .trollbox {
    display: flex;
    flex-direction: column;
    width: 50%;
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
    color: rgb(8, 30, 62, 0.7);
    font-weight: bold;
    padding-right: 0.3em;
  }
  .comment-bet-username {
    color: #081e3e;
    font-weight: bold;
    padding-right: 0.3em;
  }

  .comment-text {
    margin-bottom: 1em;
  }

  .comment-bet {
    background-color: rgba(24, 150, 110, 0.05);
    margin-bottom: 0.5em;
    width: 100%;
    position: relative;
  }

  .comment-bet-amount {
    float: right;
    padding-right: 0.3em;
    color: #081e3e;
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
</style>

<Dialog
  bind:this={dialog}
  on:MDCDialog:closed={closeHandler}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content">
  <Title id="dialog-title">
    <span>
      <img class="dice-img" alt="" src="dice.png" />
      What are you betting on?
    </span>
  </Title>
  <Content id="dialog-content">
    <div bp="padding-top--sm">
      <div bp="margin-bottom--sm">
        <div class="margins">
          <Textfield
            fullwidth
            textarea
            on:keyup={handleInput}
            bind:value={description}
            label="Description"
            input$aria-controls="helper-text-fullwidth-textarea"
            input$aria-describedby="helper-text-fullwidth-textarea" />
          <HelperText id="helper-text-manual-d">describe your bet</HelperText>
        </div>
      </div>
      <div bp="grid 6 margin-bottom--sm">
        <div>
          <Textfield
            variant="outlined"
            bind:value={amount}
            on:keyup={handleInput}
            label="100 minimum"
            type="number"
            input$aria-controls="helper-text-outlined-a"
            input$aria-describedby="helper-text-outlined-a" />
          <HelperText id="helper-text-manual-d">satoshi</HelperText>
        </div>
      </div>
    </div>
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button action="submit" {disabled}>
      <Label>Post it!</Label>
    </Button>
  </Actions>
</Dialog>

<div class="trollbox">
  <div class="trollbox-header">
    <div class="trollbox-header-title">Troll Feast</div>
  </div>
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
      <img class="trollbox-input-profile" alt="" src={user.avatarURL} />
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
        on:click={handleOpenDialog}
        alt=""
        src="btc-btn.png" />
      <img
        class="trollbox-input-btn"
        on:click={() => alert('insert emojiis')}
        alt=""
        src="emojii-joker.png" />
    </div>
  </div>
</div>
