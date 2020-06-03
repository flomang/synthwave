<script>
  import Bets from "./Bets.svelte";
  import Chat from "./Chat.svelte";

  export let user;

  let selected = "trollbox";
  let scroll = false;
  let handleSelection = selection => {
    selected = selection;

    if (selected == "trollbox") {
      scroll = true;
    }
  };
</script>

<style>
  .trollbox {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
    height: 700px;
    background-color: rgb(9, 9, 9);
    border-style: solid;
    border-width: 1px;
    border-color: rgb(0, 0, 0);
    position: relative;
  }

  .trollbox-header {
    color: #888;
    font-weight: bold;
    background-color: rgb(0, 0, 0);
    height: 50px;
    line-height: 50px;
  }

  .trollbox-header-title {
    margin-left: 1em;
    margin-right: 1em;
  }

  .selected {
    color: rgb(255, 237, 54);
  }
</style>

<div class="trollbox">
  <div class="trollbox-header">
    <span
      class="trollbox-header-title {selected == 'trollbox' ? 'selected' : ''}"
      on:click={() => handleSelection('trollbox')}>
      trollbox
    </span>
    <span
      class="trollbox-header-title {selected == 'bets' ? 'selected' : ''}"
      on:click={() => handleSelection('bets')}>
      bets
    </span>
  </div>
  <div>
    {#if selected == 'bets'}
      <Bets {user} />
    {:else if selected == 'trollbox'}
      <Chat {user} />
    {/if}
  </div>
</div>
