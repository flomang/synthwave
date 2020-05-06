<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import { goto } from "@sapper/app";
</script>

<style>
  nav {
    color: #fff;
    background-color: #090f15;
    height: 46px;
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
    margin-top: 3px;
    margin-bottom: 3px;
    margin-right: 3px;
    height: 40px;
    border-radius: 6px;
  }
  .btc-symbol {
    width: 24px;
    height: 24px;
    position: relative;
    top: 6px;
  }
  .balance {
    position: relative;
    left: -3px;
  }
  .available {
    background: rgba(0, 255, 0, 0.3);
  }
  .play {
    background: rgba(255, 0, 0, 0.6);
  }
  .nav-icon {
    margin-right: 9px;
    margin-left: 9px;
  }
</style>

<nav bp="grid 4">
  <div>
    <div bp="grid 6">
      <div on:click={() => goto(".")}>Market</div>
      <div on:click={() => goto("/open")}>Open Bet</div>
    </div>
  </div>
  <div bp="offset-3">
    <div bp="grid 1 gap-none">
      <div bp="4" class="outline available" on:click={() => goto("/balance")}>
        <img class="btc-symbol" alt="" src="btc_symbol.png" />
        <span class="balance">10.1983230</span>
      </div>
      <div bp="4" class="outline play" on:click={() => goto("/play")}>
        <img class="btc-symbol" alt="" src="btc_symbol.png" />
        <span class="balance">0.00031233</span>
      </div>
      <div bp="offset-10">
        <div class="nav-icon">
          <IconButton
            class="material-icons"
            on:click={() => goto("/messages")}>
            message
          </IconButton>
        </div>
      </div>
      <div>
        <div class="nav-icon">
          <IconButton
            class="material-icons"
            on:click={() => goto("/profile")}>
            person
          </IconButton>
        </div>
      </div>
    </div>
  </div>
</nav>
