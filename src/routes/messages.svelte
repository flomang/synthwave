<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import orderBy from "lodash/orderBy";
  import sortBy from "lodash/sortBy";
  import remove from "lodash/remove";
  import TrollBox from "../components/TrollBox.svelte";

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
    //bets = orderBy(bets, ['amount'], ['desc']);
    bets = sortBy(bets, [function(b) { return parseInt(b.amount) }]).reverse();
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

  let addBet = (bet) => {
    bet.id = nextID;
    bets = bets.concat(bet);
    nextID++;
  }
</script>

<style>
  .content {
    display: flex;
  }
  .bets {
    width: 50%;
    max-width: 50%;
    text-align: left;
    background-color: #f9f9f9;
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    position: relative;
  }

  .bet-container {
    display: flex;
    border-style: solid;
    border-width: 1px;
    border-color: #437875;
    border-radius: 4px;
    background-color: rgba(230, 241, 140, 0.05);
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
    color: rgba(24, 150, 110, 0.7);
    font-weight: bold;
    padding-right: 0.3em;
  }

  .comment-bet-amount {
    float: right;
    padding-right: 0.3em;
    color: rgba(24, 150, 110, 0.7);
    font-weight: bold;
  }

  .dice-img-bet-slip {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
  }

  .comment-bet-description {
    padding-left: 1em;
    color: rgba(24, 150, 110, 0.7);
  }

  .dice-img {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
  }

  .bet-username {
    color: #888;
    font-weight: bold;
    padding-right: 0.3em;
  }

  .confirm-bet-avatar {
    height: 30px;
    width: 30px;
    position: relative;
    top: -10px;
    margin-left: 0.5em;
    margin-top: 0.5em;
    margin-right: 0.5em;
  }
</style>

<svelte:head>
  <title>trollbox</title>
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
      <div class="bet-container" transition:fade>
        <div>
          <img class="bet-avatar" alt="" src={bet.profileImage} />
        </div>
        <div class="bet-slip">
          <span class="comment-bet-username">{bet.username}</span>
          <span class="comment-bet-amount">Bet: {bet.amount} sats</span>
          <div class="comment-bet-description">{bet.description}</div>
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

<div class="content">
  <div class="bets">
    {#each bets as bet (bet.id)}
      <div class="bet-container" transition:fade>
        <div>
          <img class="bet-avatar" alt="" src={bet.profileImage} />
        </div>
        <div class="bet-slip">
          <span class="comment-bet-username">{bet.username}</span>
          <span class="comment-bet-amount">
            <img
              on:click={() => openConfirm(bet)}
              class="dice-img-bet-slip"
              alt=""
              src="dice.png" />
            Bet: {bet.amount} sats
          </span>
          <div class="comment-bet-description">{bet.description}</div>
        </div>
      </div>
    {/each}
  </div>
  <TrollBox handleAddBet={addBet} />
</div>
