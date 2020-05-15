<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import { goto } from "@sapper/app";
  export let segment = null;
</script>

<style>
  nav {
    color: #fff;
    background-color: #081e3e;
    height: 46px;
    padding-left: 20px;
  }

  div {
    color: #fff;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #081e3e;
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
    background: rgba(114, 179, 126, 0.6);
  }
  .play {
    background: rgba(255, 0, 0, 0.3);
  }
  .nav-icon {
    margin-right: 9px;
  }
</style>

<nav class={segment} bp="grid 1">
  <div bp="4">
    <div bp="grid 6">
      <div on:click={() => goto('/space')}>space</div>
    </div>
  </div>
  <div bp="8">
    <div bp="grid 1 gap-none">
      <div bp="1@sm 2@md offset-10@sm offset-7@md offset-7@lg" class="outline available" on:click={() => goto('/balance')}>
        <img class="btc-symbol" alt="" src="btc_symbol.png" />
        <span class="balance">10.1983230</span>
      </div>
      <div bp="1@sm 2@md" class="outline play" on:click={() => goto('/playbook')}>
        <img class="btc-symbol" alt="" src="btc_symbol.png" />
        <span class="balance">0.00031233</span>
      </div>
      <div bp="show@xs show@sm hide@md hide@lg"> 
        <IconButton class="material-icons" on:click={() => goto('/messages')}>
          fastfood
        </IconButton>
      </div>
      <div bp="show@md show@lg hide@sm">
        <IconButton class="material-icons" on:click={() => goto('/messages')}>
          message
        </IconButton>
      </div>
      <div bp="show@md show@lg hide@sm">
        <IconButton class="material-icons" on:click={() => goto('/profile')}>
          person
        </IconButton>
      </div>
    </div>
  </div>
</nav>
