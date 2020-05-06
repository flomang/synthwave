<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import Button, { Group, GroupItem } from "@smui/button";
  import { goto } from "@sapper/app";

  let superText = "";
  let items = [
    {
      user: "Gravy's Couch Warriors",
      description: "Warriors loose game 6 by more than 10",
      amount: "0.00000300 btc",
      expires: "April 6, 2020 10:00 PM MST"
    },
    {
      user: "Flowy's Juicer",
      description: "Manchester United (Upcake22) (E)",
      amount: "0.00005000 btc",
      expires: "May 9, 2020 4:00 PM MST"
    },
    {
      user: "Magic Couch",
      description: "John Jones vs Cormier looses round 3 in points but wins match by tko",
      amount: "0.00005000 btc",
      expires: "June 10, 2020 8:00 PM MST"
    },
  ];
</script>

<style>
  h1,
  figure,
  p,
  div {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }
  .content {
    background-color: #fff;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>History</title>
</svelte:head>

<div class="content" bp="padding">
  <div bp="grid 3">
    <div><h3>Bookie</h3></div>
    <div><h3>Description</h3></div>
    <div><h3>Amount</h3></div>
    <div><h3>Expires</h3></div>
    {#each items as item}
      <div>{item.user}</div>
      <div>{item.description}</div>
      <div>{item.amount}</div>
      <div>{item.expires}</div>
    {/each}
  </div>
</div>
