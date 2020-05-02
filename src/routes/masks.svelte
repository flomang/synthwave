<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import { goto } from "@sapper/app";
  let masks = [
    {
      title: "APOLLO INK – ESSENTIAL MASK",
      price: "$5.50 per blank",
      image: "APOLLO_MASK-4.webp"
    },
    {
      title: "Tultex – FM19 Face Mask",
      price: "$6.75 per blank",
      image: "TULTEX_MASK-1.webp"
    },
    {
      title: "BELLA+CANVAS – DAILY FACE COVER",
      price: "As low as $2.65 printed",
      image: "BELLA-MASK-2.webp"
    }
  ];
</script>

<style>
  .content {
    background-color: #fff;
  }
  div {
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>

<svelte:head>
  <title>Masks</title>
</svelte:head>

<div class="content" bp="padding">
  <h1>Face Masks</h1>
  <p>
    Apollo Ink wants to make sure these essential products are affordable and
    available to everyone. All of these masks can be embellished with your
    branding with minimum orders starting as low as 10 pieces.
  </p>
  <div bp="grid 4">
    {#each masks as mask, i}
      <div>
        <div>
          <img alt="" src="apparel/{mask.image}" />
          <p bp="margin-top--none">{mask.title}</p>
          <p bp="margin-top--none">{mask.price}</p>
        </div>
        <Fab color="primary" on:click={() => goto('/contact')} extended>
          <Label>Order</Label>
        </Fab>
      </div>
    {/each}
  </div>
  <hr bp="margin--lg" />
  <p>
    <b>Disclaimer:</b>
    <i>
      These mask should not be used (1) in any surgical setting or where
      significant exposure to liquid, bodily or other hazardous fluids, may be
      expected; (2) in a clinical setting where the infection risk level through
      inhalation exposure is high; or (3) in the presence of a high intensity
      heat source or flammable gas. Apollo Ink, LLC makes no warranties, either
      express or implied, that the mask prevents infection or the transmission
      of viruses or diseases.
    </i>
  </p>

</div>
