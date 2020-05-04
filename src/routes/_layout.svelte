<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    background-color: #efefef;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  img {
    left: 280px;
    top: 22px;
    width: 55px;
    height: 40px;
    position: absolute;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
