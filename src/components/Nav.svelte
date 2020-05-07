<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import { goto } from "@sapper/app";
</script>

<style>
  nav {
    color: #fff;
    background-color: #090f15;
    height: 46px;
    padding-left: 20px;
  }

  div {
    color: #fff;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #090f15;
    height: 46px;
    line-height: 46px;
    font-size: 13px;
    text-align: center;
  }

  .outline {
    margin-top: 5px;
    margin-bottom: 5px;
    height: 36px;
    border-radius: 6px;
    max-width: 120px;
  }
  .btc-symbol {
    width: 24px;
    height: 24px;
    position: relative;
    top: 3px;
  }
  .balance {
    position: relative;
    left: -3px;
    top: -3px;
  }
  .available {
    background: rgba(0, 255, 0, 0.3);
  }
  .play {
    background: rgba(255, 0, 0, 0.6);
  }
  .nav-icon {
    margin-right: 9px;
  }
</style>

<nav bp="grid 1">
  <div bp="4">
    <div bp="grid 6">
      <div on:click={() => goto('.')}>Market</div>
      <div on:click={() => goto('/open')}>Open Bet</div>
    </div>
  </div>
  <div bp="4@sm 4@md 5@lg offset-7@sm offset-8@md offset-9@lg">
    <div bp="grid 1 gap-none">
      <div bp="1@sm 4@md 4@lg offset-1@md offset-3@lg" class="outline available" on:click={() => goto('/balance')}>
        <img class="btc-symbol" alt="" src="btc_symbol.png" />
        <span class="balance">10.1983230</span>
      </div>
      <div bp="1@sm 4@md 4@lg" class="outline play" on:click={() => goto('/play')}>
        <img class="btc-symbol" alt="" src="btc_symbol.png" />
        <span class="balance">0.00031233</span>
      </div>
      <div>
        <IconButton class="material-icons" on:click={() => goto('/messages')}>
          message
        </IconButton>
      </div>
      <div>
        <IconButton class="material-icons" on:click={() => goto('/profile')}>
          person
        </IconButton>
      </div>
    </div>
  </div>
</nav>
