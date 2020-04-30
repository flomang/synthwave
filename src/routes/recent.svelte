<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";
  import map from "lodash.map";

  const id = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  function generateLayout(col) {
    return map(new Array(20), function(item, i) {
      const y = Math.ceil(Math.random() * 4) + 1;
      return gridHelp.item({
        x: 2,
        y: 2,
        w: 2,
        h: 2,
        id: id()
      });
    });
  }
  const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
  let adjustAfterRemove = false;
  let cols = 10;
  // Just generate messy layout
  let layout = generateLayout(cols);
  // Helper function which normalize. you need to pass items and columns
  let items = gridHelp.resizeItems(layout, cols);
  // Apply breakpoints
  let breakpoints = [[1100, 5], [800, 4], [530, 1]];
</script>

<style>
  .content {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
  /* :global(.svlt-grid-shadow) {
    background: pink;
  }
  :global(.svlt-grid-container) {
    background: #eee;
  } */
  .link {
    display: flex;
    padding-bottom: 20px;
  }
  .link a {
    margin-left: 10px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
</style>

<svelte:head>
  <title>Recent Work</title>
</svelte:head>

<Grid {breakpoints} bind:items {cols} let:item rowHeight={100} gap={10}>
  <div class="content" style="background: #ccc; border: 0px solid black;">
    <img src="capty.webp" />
  </div>
</Grid>
