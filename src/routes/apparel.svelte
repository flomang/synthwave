<script>
  import Fab, { Label, Icon } from "@smui/fab";
</script>

<style>
  .content {
    background-color: #fff;
  }
  div {
    text-align: center;
  }
</style>

<svelte:head>
  <title>Apparel</title>
</svelte:head>

<div class="content" bp="padding-left padding-top padding-right">
  <h1>Apparel</h1>
  <p>
    Apollo Ink offers an abundance of apparel brands in a variety of styles,
    colors, fabrics and price ranges to accommodate your individual needs. If
    you already have your graphics and have an idea of what style of apparel or
    products you need branded, GREAT! If you need help deciding, our extensive
    product knowledge will help us recommend what might work best for you.
  </p>
  <p>
    Below are links to some of the more popular garments, brands and styles that
    we offer. We also encourage you to browse our entire selection of products
    online at one of our wholesale distributors listed at the bottom of the
    page.
  </p>
  <p>
    **The prices shown on these websites are the recommended retail price. If
    you find items that you like please contact us for our wholesale prices.
  </p>

  <div>
    <Fab color="primary" on:click={() => goto('/contact')} extended>
      <Label>Make Contact</Label>
    </Fab>
  </div>
  <hr>
  <h2>100% ringspun cotton</h2>
</div>
