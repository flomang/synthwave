<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import Button, { Group, GroupItem } from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Checkbox from "@smui/checkbox";
  import { goto } from "@sapper/app";

  let superText = "";
  let stakes = [
    {
      user: "PasteBook",
      description: "Warriors loose game 6 by more than 10",
      amount: "0.00000300 btc",
      countdown: "03:10:22:04"
    },
    {
      user: "Juicer Bunny",
      description: "Manchester United (Upcake22) (E)",
      amount: "0.00005000 btc",
      countdown: "00:01:27:22"
    },
    {
      user: "Magic Couch",
      description:
        "John Jones vs Cormier looses round 3 in points but wins match by tko",
      amount: "0.00005000 btc",
      countdown: "00:00:03:43"
    }
  ];

  let selected = [stakes[2]];
</script>

<style>
  div {
    text-align: center;
    margin: 0 auto;
  }

  .content {
    background-color: rgb(22, 22, 22);
    color: #fff;
  }
  
  .left {
    text-align: left;
  }
</style>

<svelte:head>
  <title>All Bets</title>
</svelte:head>

<div class="content" bp="padding">
  <h3>playbook</h3>
  <div class="left" bp="full-width hide@sm hide@md show@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell checkbox>
            <Checkbox />
          </Cell>
          <Cell>Bookie</Cell>
          <Cell>Wager</Cell>
          <Cell>Stakes</Cell>
          <Cell>Countdown</Cell>
        </Row>
      </Head>
      <Body>
        {#each stakes as stake (stake.user)}
          <Row>
            <Cell checkbox>
              <Checkbox
                bind:group={selected}
                value={stake}
                valueKey={stake.user} />
            </Cell>
            <Cell>{stake.user}</Cell>
            <Cell>{stake.description}</Cell>
            <Cell>{stake.amount}</Cell>
            <Cell>{stake.countdown}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
  <div class="left" bp="full-width hide@sm show@md hide@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell checkbox>
            <Checkbox />
          </Cell>
          <Cell>Bookie</Cell>
          <Cell>In Play</Cell>
          <Cell>Countdown</Cell>
        </Row>
      </Head>
      <Body>
        {#each stakes as stake (stake.user)}
          <Row>
            <Cell checkbox>
              <Checkbox
                bind:group={selected}
                value={stake}
                valueKey={stake.user} />
            </Cell>
            <Cell>{stake.user}</Cell>
            <Cell>{stake.amount}</Cell>
            <Cell>{stake.countdown}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
  <div class="left" bp="full-width show@sm hide@md hide@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell checkbox>
            <Checkbox />
          </Cell>
          <Cell>Bookie</Cell>
          <Cell>In Play</Cell>
          <Cell>Countdown</Cell>
        </Row>
      </Head>
      <Body>
        {#each stakes as stake (stake.user)}
          <Row>
            <Cell checkbox>
              <Checkbox
                bind:group={selected}
                value={stake}
                valueKey={stake.user} />
            </Cell>
            <Cell>{stake.user}</Cell>
            <Cell>{stake.amount}</Cell>
            <Cell>{stake.countdown}</Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</div>
