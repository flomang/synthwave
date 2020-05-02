<script>
  import Select, { Option } from "@smui/select";
  let valueSelected = "";
  let selections = [
    {
      option: "25-50 pieces",
      prices: [
        "1 color/1 side – $2.35",
        "2 color/1 side – $3.00",
        "3 color/1 side – $3.50",
        "4 color/1 side – $4.00",
        "5 color/1 side – $4.50",
        "6 color/1 side – $4.95"
      ]
    },
    {
      option: "51-150 pieces",
      prices: [
        "1 color/1 side – $2.00",
        "2 color/1 side – $2.80",
        "3 color/1 side – $3.35",
        "4 color/1 side – $3.80",
        "5 color/1 side – $4.20",
        "6 color/1 side – $4.65"
      ]
    },
    {
      option: "151-300 pieces",
      prices: [
        "1 color/1 side – $1.70",
        "2 color/1 side – $2.55",
        "3 color/1 side – $3.10",
        "4 color/1 side – $3.55",
        "5 color/1 side – $3.90",
        "6 color/1 side – $4.35"
      ]
    },
    {
      option: "301-450-50 pieces",
      prices: [
        "1 color/1 side – $1.40",
        "2 color/1 side – $2.25",
        "3 color/1 side – $2.75",
        "4 color/1 side – $3.30",
        "5 color/1 side – $3.70",
        "6 color/1 side – $4.00"
      ]
    },
    {
      option: "451-1000+ pieces",
      prices: [
        "1 color/1 side – $1.15",
        "2 color/1 side – $1.90",
        "3 color/1 side – $2.40",
        "4 color/1 side – $3.00",
        "5 color/1 side – $3.40",
        "6 color/1 side – $3.80"
      ]
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
</style>

<svelte:head>
  <title>Prints</title>
</svelte:head>
<div class="content" bp="padding">
  <h1>Print Pricing</h1>
  <p>
    The prices listed below are based on per color/per side. We offer an
    abundance of apparel styles, colors, sizes and price ranges to accommodate
    your individual needs. Please contact us for more specific details.
  </p>
  <div>
    <Select
      variant="filled"
      enhanced
      bind:value={valueSelected}
      label="Quantity">
      <Option value="" />
      {#each selections as sel}
        <Option value={sel.option} selected={valueSelected === sel.option}>
          {sel.option}
        </Option>
      {/each}
    </Select>
  </div>

  <div>
    {#if valueSelected == ''}
      {#each selections[0].prices as price}
        <p>{price}</p>
      {/each}
    {:else}
      {#each selections as sel}
        {#if sel.option == valueSelected}
          {#each sel.prices as price}
            <p>{price}</p>
          {/each}
        {/if}
      {/each}
    {/if}
  </div>

</div>
