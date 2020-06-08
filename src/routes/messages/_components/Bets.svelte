<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import HelperText from "@smui/textfield/helper-text/index";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import sortBy from "lodash/sortBy";
  import remove from "lodash/remove";

  export let user;
  let scrollableDiv;
  let disabled = true;
  let createBetDialog;
  let takeBetDialog;
  let description = "";
  let amount = "";
  let bet = null;
  let nextID = 3;

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

  beforeUpdate(() => {
    // sort the bets by desc amount
    bets = sortBy(bets, [
      function(b) {
        return parseInt(b.amount);
      }
    ]).reverse();
  });

  let handleInput = event => {
    if (amount > 100 && description != "") {
      disabled = false;
    } else {
      disabled = true;
    }
  };

  let handleOpenCreate = event => {
    disabled = true;
    createBetDialog.open();
  };

  let handleCloseCreate = event => {
    if (event.detail.action == "submit") {
      console.log("submit the bet");

      let newBet = {
        id: nextID,
        username: user.username,
        profileImage: user.avatarURL ? user.avatarURL : defaultAvatar,
        description: description,
        amount: amount
        //timer: expiration
      };
      bets = bets.concat(newBet);
      nextID++;
    }

    amount = ""; 
    description = "";
  };

  let handleOpenBet = wager => {
    bet = wager;
    takeBetDialog.open();
  };

  let handleTakeBet = () => {
    remove(bets, function(b) {
      return b.id == bet.id;
    });
    bet = null;
  };

  let handleCancelBet = wager => {
    remove(bets, function(b) {
      return b.id == wager.id;
    });
    bets = bets;
  };
</script>

<style>
  .bet-container {
    display: flex;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(15, 15, 15);
    background: rgb(25, 25, 25);
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
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

  .bet-header-left {
    color: rgb(255, 237, 54);
    font-weight: bold;
    padding-right: 0.3em;
  }

  .bet-header-right {
    float: right;
    padding-right: 0.3em;
    color: rgb(255, 237, 54);
    font-weight: bold;
  }

  .bet-amount {
    padding-right: 0.3em;
  }

  .bet-description {
    padding-left: 1em;
    color: #fff;
  }

  .bet-input-container {
    background-color: rgb(0, 0, 0);
    height: 60px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    align-items: left;
    display: flex;
  }

  .bet-input-btn {
    height: 30px;
    width: 30px;
  }

  .scrollable-bets {
    width: 100%;
    position: absolute;
    top: 50px;
    margin: 0 0 0.5em 0;
    overflow-y: auto;
    height: 450px;
  }
</style>

<svelte:head>
  <title>bets</title>
</svelte:head>

<Dialog
  bind:this={createBetDialog}
  on:MDCDialog:closed={handleCloseCreate}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content">
  <Title id="dialog-title">
    <span>
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
  bind:this={takeBetDialog}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content">
  <Title id="dialog-title">
    <span>
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
          <span class="bet-username">{bet.username}</span>
          <span class="bet-amount">Bet: {bet.amount} sats</span>
          <div bp="margin-top--lg" class="bet-description">
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
    <Button on:click={handleTakeBet} action="submit">
      <Label>Take it!</Label>
    </Button>
  </Actions>
</Dialog>

<div transition:fade>
  <div class="scrollable-bets" bind:this={scrollableDiv}>
    {#each bets as bet (bet.id)}
      <div class="bet-container" transition:fade>
        <div>
          <img class="bet-avatar" alt="" src={bet.profileImage} />
        </div>
        <div class="bet-slip">
          <span class="bet-header-left">{bet.username}</span>
          <span class="bet-header-right">
            <span class="bet-amount">Bet: {bet.amount} sats</span>
            {#if bet.username != user.username}
              <Button
                color="primary"
                on:click={() => handleOpenBet(bet)}
                variant="raised">
                <Label>Take it!</Label>
              </Button>
            {:else}
              <Button
                color="primary"
                on:click={() => handleCancelBet(bet)}
                variant="outlined">
                <Label>Bounce</Label>
              </Button>
            {/if}
          </span>
          <div class="bet-description">{bet.description}</div>
        </div>
      </div>
    {/each}
  </div>
    <div class="bet-input-container">
      <img
        class="bet-input-btn"
        on:click={handleOpenCreate}
        alt=""
        src="btc-btn.png" />
    </div>
</div>
