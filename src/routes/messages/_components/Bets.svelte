<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import sortBy from "lodash/sortBy";
  import remove from "lodash/remove";

  export let user;

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
</style>

<svelte:head>
  <title>bets</title>
</svelte:head>

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

<div class="bets" transition:fade>
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
