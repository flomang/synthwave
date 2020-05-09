<script>
  import { onMount } from "svelte";

  let pixiComponent;
  //  pixi.js is a client side library. We only load this onMount
  // i.e. when the client browser loads this page 
  onMount(async () => {
    const module = await import ('../components/space/index.svelte');
	  pixiComponent = module.default;
  });
</script>

<svelte:component this={pixiComponent}/>
