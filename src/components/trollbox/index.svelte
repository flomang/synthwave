<script>
  import { onMount } from "svelte";
  import { Ticker } from "./ticker.js";

  // bind the canvas element i.e bind:this={canvas} 
  let canvas;
  onMount(() => {
    // must only load this on the client because pixijs is a client only library
    new Ticker({canvas: canvas});
  });
</script>

<style>
  canvas {
    height: 50px;
    width: 100%;
  }
</style>

<canvas bind:this={canvas} />
