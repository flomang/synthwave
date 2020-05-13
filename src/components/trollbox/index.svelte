<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { onMount } from "svelte";
  import { Ticker } from "./ticker.js";

  export let bets = [];

  beforeUpdate(() => {
    if (bets.length > mountCount && ticker) {
      let newBet = bets[bets.length - 1];
      ticker.addBet(newBet);
    }
  });

  let mountCount = 0;
  let ticker;
  // bind the canvas element i.e bind:this={canvas}
  let canvas;
  onMount(() => {
    mountCount = bets.length;
    // must only load this on the client because pixijs is a client only library
    ticker = new Ticker({ canvas: canvas, bets: bets });
  });
</script>

<style>
  canvas {
    height: 50px;
    width: 100%;
  }
</style>

<canvas bind:this={canvas} />
