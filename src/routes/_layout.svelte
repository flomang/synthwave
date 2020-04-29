<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<div bp="padding-left padding-top">
  <h1>Apollo Ink Printing</h1>
  <p>Custom Screen Printing, Arts & Branding. Est-2006</p>
</div>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
