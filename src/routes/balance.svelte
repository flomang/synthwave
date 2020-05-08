<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import Button, { Group, GroupItem } from "@smui/button";
  import { goto } from "@sapper/app";

  let superText = "";
  let items = [
    {
      date: "2020-01-01",
      address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      amount: "0.00300000 btc",
      type: "deposit"
    },
    {
      date: "2020-02-03",
      address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      amount: "0.00000299 btc",
      type: "widthdraw"
    },
    {
      date: "2020-02-10",
      address: "Helmet",
      amount: "0.000093000 btc",
      type: "win"
    },
    {
      date: "2020-03-04",
      address: "Magic Couch",
      amount: "0.000020000 btc",
      type: "loss"
    }
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
  <h3>Balance</h3>
  <div bp="grid 3">
    <div>
      <h3>Date</h3>
    </div>
    <div>
      <h3>Type</h3>
    </div>
    <div>
      <h3>From</h3>
    </div>
    <div>
      <h3>Amount</h3>
    </div>
  </div>

  <div bp="grid 3">
    {#each items as item}
        <div>{item.date}</div>
        <div>{item.type}</div>
        <div>{item.address}</div>
        <div>{item.amount}</div>
    {/each}
  </div>
</div>
