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
  <title>Sapper project template</title>
</svelte:head>

<div class="content" bp="padding">
  <figure>
    <img alt="Borat" src="apollopage.webp" />
    <figcaption>A message from Graby!</figcaption>
  </figure>

  <p>
    While everyone continues to cope with the uncertainty of COVID-19, Apollo
    Ink is fully committed to supporting essential businesses and providing
    essential products to everyone in need throughout the course of this
    pandemic. Apollo Ink puts safety first, and everyones health and well-being
    is our top priority. We are operational but have transitioned to “no
    contact” client interactions and are now online order fulfillment only.
    Until further notice our print facility and showroom will remain closed to
    the public. Our workforce has been reduced to the absolute minimum to
    maintain a clean and healthy environment. We are abiding by mandated
    protocols and additional precautionary measures to ensure the proper
    practice of social distancing. As difficult as it is for everyone to adapt
    to this fluid situation, Apollo Ink wants our clients to know that we are
    here for you. We will be doing everything in our power to help everyone move
    forward and get through these challenging circumstances.
  </p>
  <p>
    <b>We are all in this together, your mission is our mission.</b>
  </p>

  <div>
    <Fab color="primary" on:click={() => goto('/masks')} extended>
      <Label>Face Masks</Label>
    </Fab>
    <Fab color="primary" on:click={() => goto('/apparel')} extended>
      <Label>Apparel</Label>
    </Fab>
    <Fab color="primary" on:click={() => goto('/contact')} extended>
      <Label>Make Contact</Label>
    </Fab>
  </div>

  <div bp="margin-top--lg">
    <h2>What sets us apart.</h2>
    <p>
      Our team at Apollo Ink Printing has extensive printing & design experience
      and vast product knowledge. Our business is built on strong and honest
      work ethics, attention to detail and quality, along with loyal returning
      customers and their referrals. Most importantly, our competitive pricing
      and quick turnaround times at Apollo Ink Printing ensures that you receive
      a quality product in an efficient and affordable manner.
    </p>
  </div>

  <div>
    <Fab color="primary" on:click={() => alert('here')} extended>
      <Label>Launch Control</Label>
    </Fab>
  </div>
</div>
