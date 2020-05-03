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
  <h1 bp="margin-bottom--none">Synthwave</h1>
  <p bp="margin-top--none">A montage of random things</p>
</div>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
