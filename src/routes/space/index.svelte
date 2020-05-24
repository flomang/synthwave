<script>
  import { onMount } from "svelte";
  import { jwt } from "../../stores/stores.js";


  let pixiComponent;
  //  pixi.js is a client side library. We only load this onMount
  // i.e. when the client browser loads this page 
  onMount(async () => {
    const module = await import ('./_components/index.svelte');
	  pixiComponent = module.default;
  });
</script>

<p>The jwt is {$jwt} </p>
<svelte:component this={pixiComponent}/>
