<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import HelperText from "@smui/textfield/helper-text/index";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import sortBy from "lodash/sortBy";
  import remove from "lodash/remove";
  import Textfield, { Input, Textarea } from "@smui/textfield";

  export let user;
  let scrollableDiv;
  let disabled = true;
  let placeBet;
  let description = "";
  let amount = "";

  let bets = [
    {
      id: 1,
      username: "dodge bot",
      profileImage: "doge.png",
      description: "Mike Tyson is a modern day ass kicker!",
      amount: 420,
      timer: "90:00:01"
    },
    {
      id: 2,
      username: "porky pig",
      profileImage: "porky.png",
      description:
        "I am going to go all the way with this. It will become the largest casino in the world. I AM a warrior. I do not quit. 1000 worthy souls. I will be kind to everyone. I am humble, calm, and in control at all times.",
      amount: 300000000000,
      timer: "90:00:01"
    }
  ];
  let dialog;
  let bet = null;
  let nextID = 3;

  // add random comments
  beforeUpdate(() => {
    bets = sortBy(bets, [
      function(b) {
        return parseInt(b.amount);
      }
    ]).reverse();
  });

  let openConfirm = b => {
    bet = b;
    dialog.open();
  };

  let confirm = () => {
    remove(bets, function(b) {
      return b.id == bet.id;
    });
    bet = null;
  };

  let removeBet = bet => {
    remove(bets, function(b) {
      return b.id == bet.id;
    });
    bets = bets;
  };

  let addBet = bet => {
    bet.id = nextID;
    bets = bets.concat(bet);
    nextID++;
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

  let closeHandler = event => {
    if (event.detail.action == "submit") {
      console.log("submit the bet");

      let newBet = {
        username: user.username,
        profileImage: user.avatarURL ? user.avatarURL : defaultAvatar,
        description: description,
        amount: amount,
        //timer: expiration
      };
      addBet(newBet);
    }

    amount = NaN;
    description = "";
  };

  let handleOpenDialog = event => {
    disabled = true;
    placeBet.open();
  };
</script>

<style>
  .dice-img {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
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

  .trollbox-input-btn {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    margin-top: 16px;
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
</style>

<svelte:head>
  <title>bets</title>
</svelte:head>

<Dialog
  bind:this={placeBet}
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

<Dialog
  bind:this={dialog}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content">
  <Title id="dialog-title">
    <span>
      <img class="dice-img" alt="" src="dice.png" />
      Take this bet?
    </span>
  </Title>
  <Content id="dialog-content">
    {#if bet != null}
      <div class="bet-take-container" transition:fade>
        <div>
          <img class="bet-avatar" alt="" src={bet.profileImage} />
        </div>
        <div class="bet-slip">
          <span class="comment-bet-username">{bet.username}</span>
          <span class="comment-bet-amount">Bet: {bet.amount} sats</span>
          <div bp="margin-top--lg" class="comment-bet-description">
            {bet.description}
          </div>
        </div>
      </div>
    {/if}
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={confirm} action="submit">
      <Label>Take it!</Label>
    </Button>
  </Actions>
</Dialog>

<div transition:fade>
  <div class="trollbox-scrollable" bind:this={scrollableDiv}>
    {#each bets as bet (bet.id)}
      <div class="bet-container" transition:fade>
        <div>
          <img class="bet-avatar" alt="" src={bet.profileImage} />
        </div>
        <div class="bet-slip">
          <span class="comment-bet-username">{bet.username}</span>
          <span class="comment-bet-amount">
            Bet: {bet.amount} sats
            {#if bet.username != user.username}
              <Button
                color="primary"
                on:click={() => openConfirm(bet)}
                variant="raised">
                <Label>Take it!</Label>
              </Button>
            {:else}
              <Button
                color="secondary"
                on:click={() => removeBet(bet)}
                variant="outlined">
                <Label>Bounce</Label>
              </Button>
            {/if}
          </span>
          <div class="comment-bet-description">{bet.description}</div>
        </div>
      </div>
    {/each}
  </div>
  <div class="trollbox-input">
    <div class="trollbox-input-container">
      <img
        class="trollbox-input-btn"
        on:click={handleOpenDialog}
        alt=""
        src="btc-btn.png" />
    </div>
  </div>
</div>
