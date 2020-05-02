<script>
  import { fade } from "svelte/transition";

  let answer;

  let reviews = [
    {
      text:
        "Apollo Ink is an awesome print shop! I’ve worked with them a couple times to print jerseys for my hockey team. They gave me good initial estimates and it turned out to be an even better deal at the end.",
      reviewer: "Charles Stewart"
    },
    {
      text:
        "Apollo Ink is where its at. The personal customer service and top quality prints has been the reason why Dromas Apparel has continued to partner with Apollo.",
      reviewer: "Jacob Kulchin"
    },
    {
      text:
        "We use Apollo for all of the print work for our dive trip apparel at Ocean First Divers. If you’ve been on a trip with us recently, chances are the shirt you love so much came from Apollo Ink.",
      reviewer: "Chad Koll"
    },
    {
      text:
        "I placed an order with Apollo ink. It took only a week for them to source the shirts and return to me my finished product. No complaints here.",
      reviewer: "Jim Borchardt"
    }
  ];
  let review = reviews[0];
  let i = 0;
  let visible = true;
  function cycle() {
    ++i;
    i = i % 3;
    review = reviews[i];
    visible = false;
    setTimeout(show, 500);
  }
  function show() {
    visible = true;
  }
  setInterval(cycle, 6000);
</script>

<style>
  footer {
    color: #fff;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: rgba(0, 0, 0, 0.8);
    height: 45px;
    line-height: 45px;
    font-size: 13px;
    text-align: center;
  }
  .left {
    text-align: right;
  }
  .reviews {
    font-size: 12px;
  }
</style>

<div bp="grid 3">
  <div bp="offset-2 padding--lg">
    <h2>Our Location</h2>
    <div>
      <p bp="margin-bottom--none">
        We are located in Boulder, Colorado. Please call to setup a time to see
        samples and to meet the team.
      </p>
      <p bp="margin--none">
        <b>1945 33rd St., Boulder, CO 80301</b>
      </p>
      <p bp="margin--none">Phone: (720) 366-0662</p>
    </div>
  </div>
  <div bp="padding--lg ">
    <h2>Reviews</h2>
    <div class="reviews">
      {#if visible}
        <div>
          <p bp="margin--none" transition:fade>{review.text}</p>
          <p bp="margin--none" transition:fade class="left">
            - {review.reviewer}
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>

<footer>© 2020 Apollo Ink Printing</footer>
