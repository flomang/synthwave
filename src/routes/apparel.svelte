<script>
  import Fab, { Label, Icon } from "@smui/fab";
  import { goto } from "@sapper/app";

  let distributors = [
	  "https://www.ssactivewear.com",
	  "https://www.alphabroder.com",
	  "https://www.tscapparel.com",
	  "https://www.sanmar.com",
	  "https://spectrausa.net",
	  "https://www.royalapparel.net"
  ];

  let mens = [
    {
      title: "100% ringspun cotton",
      shirts: [
        { image: "canvas_3001.jpg", text: "Canvas #3001" },
        { image: "next_level_3600.jpg", text: "Next Level #3600" },
        { image: "anvil_980.jpg", text: "Anvel #980" }
      ]
    },
    {
      title: "poly / cotton blends",
      shirts: [
        { image: "canvas_3001cvc.jpg", text: "Canvas #3001cvc" },
        { image: "6210_Next_level.jpg", text: "Next Level #6210" },
        { image: "980_Anvil.jpg", text: "Anvil #980" }
      ]
    },
    {
      title: "Tri-blends",
      shirts: [
        { image: "3413_Canvas.jpg", text: "Canvas #3413" },
        { image: "6010_Next_Level.jpg", text: "Next Level #6010" },
        { image: "dm130.jpg", text: "District #DM130" }
      ]
    },
    {
      title: "Miscellaneous",
      shirts: [
        {
          image: "6030-comfort_colors.jpg",
          text: "Comfort Colors Pocket T #6030"
        },
        { image: "17272_f_fl.jpg", text: "Hanes Beefy-T #5810" },
        { image: "2000_Gildan.jpg", text: "Gildan #2000" }
      ]
    }
  ];

  let ladies = [
    {
      title: "Ladies 100% ringspun cotton",
      shirts: [
        { image: "43642_f_fl.jpg", text: "BELLA – Relaxed Jersey Tee – #6400" },
        {
          image: "45904_f_fl-1.jpg",
          text: "Next Level – Women’s Ideal Crew – #1510"
        },
        {
          image: "45958_f_fl-2.jpg",
          text: "Next Level – Boyfriend Crew – 3900"
        }
      ]
    },
    {
      title: "Ladies poly / cotton blends",
      shirts: [
        {
          image: "93189_f_fl-768x960.jpg",
          text: "BELLA – Relaxed Fit – #6400CVC"
        },
        {
          image: "41191_f_fl.jpg",
          text: "Next Level – CVC Short Sleeve Crew – #6610"
        },
        {
          image: "68209_f_fl.jpg",
          text: "Anvil – Women’s Lightweight T-Shirt – #880"
        }
      ]
    },
    {
      title: "Ladies Tri-blends",
      shirts: [
        {
          image: "39791_f_fl.jpg",
          text: "BELLA – Women’s Triblend Tee – #8413"
        },
        {
          image: "41215_f_fl-3.jpg",
          text: "Next Level – Triblend Short Sleeve Crew – #6710"
        },
        {
          image: "49810_f_fl.jpg",
          text: "Next Level – Triblend – Deep V – #6740"
        }
      ]
    },
    {
      title: "Tank Tops",
      shirts: [
        {
          image: "39795_f_fl.jpg",
          text: "BELLA – Triblend Racerback Tank – #8430"
        },
        {
          image: "45885_f_fl.jpg",
          text: "Next Level – Ideal Racerback Tank – #1533"
        },
        {
          image: "67351_f_fl.jpg",
          text: "Next Level – Festival Muscle Tank – #5013"
        }
      ]
    }
  ];

  let hoodies = [
    {
      title: "Hooded Sweatshirts",
      shirts: [
        {
          image: "37895_f_fl.jpg",
          text: "CANVAS – Unisex Sponge Fleece – #3739"
        },
        {
          image: "32730_f_fl.jpg",
          text: "CANVAS – Unisex Triblend – #3909"
        },
        {
          image: "19415_f_fl.jpg",
          text: "Ind Trading Co. – Heavyweight – #IND4000Z"
        },
        {
          image: "52965_f_fl.jpg",
          text: "Ind Trading Co. – Heavyweight – #IND4000"
        },
        {
          image: "33097_f_fl.jpg",
          text: "Ind Trading Co. – Midweight – #SS4500"
        },
        {
          image: "st254.jpg",
          text: "Sport-Tek – Pullover – #ST254"
        }
      ]
    },
    {
      title: "Hats",
      shirts: [
        {
          image: "84674_fl.jpg",
          text: "Yupoong – Classics Six-Panel Trucker – #6606"
        },
        {
          image: "43707_f_fl.jpg",
          text: "Yupoong – Classics-Flat Bill Snapback – #6089M"
        },
        {
          image: "20234_f_fl.jpg",
          text: "Flexfit – Twill Cap – 6277"
        }
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
  img {
    width: 100%;
    height: 100%;
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
  <hr bp="margin--lg" />
  {#each mens as man, i}
    <h2 bp="margin--lg">{man.title}</h2>
    <div bp="grid 4">
      {#each man.shirts as item, i}
        <div>
          <img alt="" src="apparel/{item.image}" />
          <p bp="margin-top--none">{item.text}</p>
        </div>
      {/each}
    </div>
  {/each}
  <div bp="margin--lg">
    <Fab color="primary" on:click={() => goto('/contact')} extended>
      <Label>Launch your project!</Label>
    </Fab>
  </div>
  {#each ladies as lady, i}
    <h2 bp="margin--lg">{lady.title}</h2>
    <div bp="grid 4">
      {#each lady.shirts as item, i}
        <div>
          <img alt="" src="apparel/{item.image}" />
          <p bp="margin-top--none">{item.text}</p>
        </div>
      {/each}
    </div>
  {/each}
  <div bp="margin--lg">
    <Fab color="primary" on:click={() => goto('/contact')} extended>
      <Label>Launch your project!</Label>
    </Fab>
  </div>
  {#each hoodies as hood, i}
    <h2 bp="margin--lg">{hood.title}</h2>
    <div bp="grid 4">
      {#each hood.shirts as item, i}
        <div>
          <img alt="" src="apparel/{item.image}" />
          <p bp="margin-top--none">{item.text}</p>
        </div>
      {/each}
    </div>
  {/each}
  <div bp="margin--lg">
    <Fab color="primary" on:click={() => goto('/contact')} extended>
      <Label>Launch your project!</Label>
    </Fab>
  </div>
  <div bp="margin-top--lg padding-bottom--lg">
    <h2 bp="margin--lg">Wholesale Distributors</h2>
	 {#each distributors as distributor, i}
        <p>
          <a href={distributor}> {distributor} </a>
        </p>
      {/each}
  </div>

</div>
