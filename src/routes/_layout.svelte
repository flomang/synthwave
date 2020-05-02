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

<div bp="padding-top--lg padding-left--lg padding-right--lg">
  <h1 bp="margin-bottom--none">Apollo Ink Printing</h1>
  <img alt="" src="apollo-man.png" />
  <p bp="margin-top--none">Custom Screen Printing, Arts & Branding. Est-2006</p>
</div>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
