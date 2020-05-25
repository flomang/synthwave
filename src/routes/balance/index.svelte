<script context="module">
  // https://sapper.svelte.dev/docs/#this_redirect
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      return this.redirect(302, "signin");
    }

    return;
  }
</script>

<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import Button, { Group, GroupItem } from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Checkbox from "@smui/checkbox";
  import { goto } from "@sapper/app";

  let statement = [
    {
      date: "2020-01-01",
      description: "From: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      type: "deposit",
      amount: "0.00300000",
      balance: "1.00000000"
    },
    {
      date: "2020-02-03",
      description: "To: 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      amount: "0.00000299",
      type: "widthdraw",
      balance: "0.000009980"
    },
    {
      date: "2020-02-10",
      description: "From: Helmet Sports",
      amount: "1.000093000",
      type: "win",
      balance: "1.000009980"
    },
    {
      date: "2020-03-04",
      description: "To: Magic Couch",
      type: "loss",
      amount: "0.000020000",
      balance: "0.000009980"
    }
  ];
</script>

<style>
  .content {
    background-color: #fff;
    text-align: center;
  }

  .left {
    text-align: left;
  }
</style>

<svelte:head>
  <title>Activity</title>
</svelte:head>

<div class="content" bp="padding">
  <h3>activity</h3>
  <div class="left" bp="full-width hide@sm hide@md show@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell>Date</Cell>
          <Cell>Description</Cell>
          <Cell>Type</Cell>
          <Cell>Amount</Cell>
          <Cell>Balance</Cell>
        </Row>
      </Head>
      <Body>
        {#each statement as txn}
          <Row>
            <Cell>{txn.date}</Cell>
            <Cell>{txn.description}</Cell>
            <Cell>{txn.type}</Cell>
            <Cell>{txn.amount}</Cell>
            <Cell>{txn.balance}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
  <div class="left" bp="full-width hide@sm show@md hide@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell>Date</Cell>
          <Cell>Type</Cell>
          <Cell>Amount</Cell>
          <Cell>Balance</Cell>
        </Row>
      </Head>
      <Body>
        {#each statement as txn}
          <Row>
            <Cell>{txn.date}</Cell>
            <Cell>{txn.type}</Cell>
            <Cell>{txn.amount}</Cell>
            <Cell>{txn.balance}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
  <div class="left" bp="full-width show@sm hide@md hide@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell>Date</Cell>
          <Cell>Type</Cell>
          <Cell>Amount</Cell>
          <Cell>Balance</Cell>
        </Row>
      </Head>
      <Body>
        {#each statement as txn}
          <Row>
            <Cell>{txn.date}</Cell>
            <Cell>{txn.type}</Cell>
            <Cell>{txn.amount}</Cell>
            <Cell>{txn.balance}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</div>
