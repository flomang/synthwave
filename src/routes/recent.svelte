<script>
  import map from "lodash.map";
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";

  let images = [
    "1.webp",
    "2.webp",
    "3.webp",
    "4.webp",
    "5.webp",
    "6.webp",
    "7.webp",
    "8.webp",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.webp",
    "13.webp",
    "14.webp",
    "15.webp",
    "16.webp",
    "17.jpg",
    "18.webp",
    "19.webp",
    "20.webp",
    "21.webp",
    "22.webp",
    "23.webp",
    "24.jpg"
  ];
  const id = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  function generateLayout(col) {
    return map(images, function(item, i) {
      const y = Math.ceil(Math.random() * 4) + 1;

      return gridHelp.item({
        x: (i * 2) % col,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: 2,
        id: i,
        image: item,
        draggable: false,
        resizable: false
      });
    });
  }
  let cols = 10;
  // Just generate messy layout
  let layout = generateLayout(cols);
  // Helper function which normalize. you need to pass items and columns
  let items = gridHelp.resizeItems(layout, cols);
  // Apply breakpoints
  let breakpoints = [[1100, 5], [800, 4], [530, 1]];

  let dialog;
  let selectedImage = "";
  function openSelection(image) {
    selectedImage = image;
    dialog.open();
  }

  function closeHandler(e) {
    if (e.detail.action === "accept") {
      selected = selection;
    }
  }
</script>

<style>
  .content {
    background-color: #fff;
  }
  .grid {
    width: 100%;
    height: 100%;
    display: flex;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>

<svelte:head>
  <title>Recent Work</title>
</svelte:head>

<div class="content">
  <Grid {breakpoints} bind:items {cols} let:item gap={10}>
    <div class="grid">
      <img on:click={() => openSelection(item.image)} alt="" src={item.image} />
    </div>
  </Grid>
</div>

<Dialog
  bind:this={dialog}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content"
  on:MDCDialog:closed={closeHandler}>
  <Content id="dialog-content">
    <img alt="" src={selectedImage} />
    <Actions>
      <Button on:click={(e) => (closeHandler(e))}>
        <Label>Close</Label>
      </Button>
    </Actions>
  </Content>
</Dialog>
