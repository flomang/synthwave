<script>
  import BettingBoard from "../components/BettingBoard.svelte";
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

  function addBet(bet) {
    bet.id = bets.length+1;
    bets = bets.concat(bet);
  }
</script>

<style>
  .content {
    display: flex;
  }
</style>

<svelte:head>
  <title>trollbox</title>
</svelte:head>

<div class="content">
  <BettingBoard {bets} />
  <TrollBox handleAddBet={addBet} />
</div>
