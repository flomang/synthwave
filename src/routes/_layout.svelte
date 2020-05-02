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
</style>

<div bp="padding-top--lg padding-left--lg padding-right--lg">
  <h1 bp="margin-bottom--none">Apollo Ink Printing</h1>
  <p bp="margin-top--none">Custom Screen Printing, Arts & Branding. Est-2006</p>
</div>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
