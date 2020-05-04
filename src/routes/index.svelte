<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import { goto } from "@sapper/app";

  let superText = "";
</script>

<style>
  h1,
  figure,
  p,
  div {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }
  .content {
    background-color: #fff;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Synthwave</title>
</svelte:head>

<div class="content" bp="padding">
  <figure>
    <img alt="Borat" src="motive.jpg" />
    <figcaption>Do the thing!</figcaption>
  </figure>
</div>
