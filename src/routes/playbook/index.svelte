<script context="module">
  // https://sapper.svelte.dev/docs/#this_redirect
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      return this.redirect(302, "signin");
    }

    return { user };
  }
</script>

<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import Button, { Group, GroupItem } from "@smui/button";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Checkbox from "@smui/checkbox";

  export const user = "";
  let superText = "";
  let bets = [
    {
      id: 1,
      user: "PasteBook",
      description: "Warriors loose game 6 by more than 10",
      amount: "0.00000300 btc",
      countdown: "03:10:22:04",
      status: "in play"
    },
    {
      id: 2,
      user: "Juicer Bunny",
      description: "Manchester United (Upcake22) (E)",
      amount: "0.00005000 btc",
      countdown: "00:01:27:22",
      status: "in play"
    },
    {
      id: 3,
      user: "Magic Couch",
      description:
        "John Jones vs Cormier looses round 3 in points but wins match by tko",
      amount: "0.00005000 btc",
      countdown: "00:00:03:43",
      status: "in play"
    },
    {
      id: 4,
      user: "...",
      description:
        "Cormier looses round 3 in points but gets knocked out in round 4",
      amount: "0.00005000 btc",
      countdown: "00:00:05:00",
      status: "pending"
    },
    {
      id: 5,
      user: "...",
      description:
        "Cormier looses round 3 in points but gets knocked out in round 4",
      amount: "0.00005000 btc",
      countdown: "00:00:03:30",
      status: "fishing for taker!"
    }
  ];

  let selected = [bets[2]];
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
  <title>Playbook</title>
</svelte:head>

<div class="content" bp="padding">
  <h3>playbook</h3>
  <div>
    <Button color="primary" on:click={() => alert('logout')} variant="raised">
      <Label>New Play</Label>
    </Button>
  </div>
  <div class="left" bp="full-width hide@sm hide@md show@lg">
    <DataTable>
      <Head>
        <Row>
          <Cell checkbox>
            <Checkbox />
          </Cell>
          <Cell>Bookie</Cell>
          <Cell>Wager</Cell>
          <Cell>Stake</Cell>
          <Cell>Countdown</Cell>
          <Cell>Status</Cell>
        </Row>
      </Head>
      <Body>
        {#each bets as bet (bet.id)}
          <Row>
            <Cell checkbox>
              <Checkbox bind:group={selected} value={bet} valueKey={bet.user} />
            </Cell>
            <Cell>{bet.user}</Cell>
            <Cell>{bet.description}</Cell>
            <Cell>{bet.amount}</Cell>
            <Cell>{bet.countdown}</Cell>
            {#if bet.status != 'pending'}
              <Cell>{bet.status}</Cell>
            {:else}
              <Cell>
                <Button
                  color="primary"
                  on:click={() => alert('logout')}
                  variant="outlined">
                  <Label>roll dice</Label>
                </Button>
                <Button
                  color="secondary"
                  on:click={() => alert('logout')}
                  variant="outlined">
                  <Label>bounce</Label>
                </Button>
              </Cell>
            {/if}
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
          <Cell>Stake</Cell>
          <Cell>Countdown</Cell>
          <Cell>Status</Cell>
        </Row>
      </Head>
      <Body>
        {#each bets as bet (bet.id)}
          <Row>
            <Cell checkbox>
              <Checkbox bind:group={selected} value={bet} valueKey={bet.user} />
            </Cell>
            <Cell>{bet.user}</Cell>
            <Cell>{bet.amount}</Cell>
            <Cell>{bet.countdown}</Cell>
            {#if bet.status != 'pending'}
              <Cell>{bet.status}</Cell>
            {:else}
              <Cell>
                <Button
                  color="primary"
                  on:click={() => alert('logout')}
                  variant="raised">
                  <Label>roll dice</Label>
                </Button>
                <Button
                  color="secondary"
                  on:click={() => alert('logout')}
                  variant="raised">
                  <Label>bounce</Label>
                </Button>
              </Cell>
            {/if}
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
          <Cell>Stake</Cell>
          <Cell>Status</Cell>
        </Row>
      </Head>
      <Body>
        {#each bets as bet (bet.id)}
          <Row>
            <Cell checkbox>
              <Checkbox bind:group={selected} value={bet} valueKey={bet.user} />
            </Cell>
            <Cell>{bet.amount}</Cell>
            {#if bet.status != 'pending'}
              <Cell>{bet.status}</Cell>
            {:else}
              <Cell>
                <Button
                  color="primary"
                  on:click={() => alert('logout')}
                  variant="raised">
                  <Label>roll dice</Label>
                </Button>
                <Button
                  color="secondary"
                  on:click={() => alert('logout')}
                  variant="raised">
                  <Label>bounce</Label>
                </Button>
              </Cell>
            {/if}
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
</div>
