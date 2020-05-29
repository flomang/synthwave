<script context="module">
  // https://sapper.svelte.dev/docs/#this_redirect
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      return this.redirect(302, "signin");
    }

    return { user };
  }
</script>

<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { fade } from "svelte/transition";
  import orderBy from "lodash/orderBy";
  import sortBy from "lodash/sortBy";
  import remove from "lodash/remove";
  import TrollBox from "./_components/TrollBox.svelte";
  import Hls from "hls.js";
  import { onMount } from "svelte";

  onMount(async () => {
    var video = document.getElementById("video");
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource("http://localhost:8080/media/1/stream/");
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "http://localhost:8080/media/1/stream/";
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }
  });

  export let user;

  let bets = [
    {
      id: 1,
      username: "dodge bot",
      profileImage: "doge.png",
      description: "Mike Tyson is a modern day ass kicker!",
      amount: 420,
      timer: "90:00:01"
    },
    {
      id: 2,
      username: "porky pig",
      profileImage: "porky.png",
      description:
        "I am going to go all the way with this. It will become the largest casino in the world. I AM a warrior. I do not quit. 1000 worthy souls. I will be kind to everyone. I am humble, calm, and in control at all times.",
      amount: 300000000000,
      timer: "90:00:01"
    }
  ];
  let dialog;
  let bet = null;
  let nextID = 3;

  // add random comments
  beforeUpdate(() => {
    //bets = orderBy(bets, ['amount'], ['desc']);
    bets = sortBy(bets, [
      function(b) {
        return parseInt(b.amount);
      }
    ]).reverse();
  });

  let openConfirm = b => {
    bet = b;
    dialog.open();
  };

  let confirm = () => {
    remove(bets, function(b) {
      return b.id == bet.id;
    });
    bet = null;
  };

  let removeBet = bet => {
    remove(bets, function(b) {
      return b.id == bet.id;
    });
    bets = bets;
  };

  let addBet = bet => {
    bet.id = nextID;
    bets = bets.concat(bet);
    nextID++;
  };

  let time = 0;
  let duration;
  let paused = true;

  let showControls = true;
  let showControlsTimeout;

  function handleMousemove(e) {
    // Make the controls visible, but fade out after
    // 2.5 seconds of inactivity
    clearTimeout(showControlsTimeout);
    showControlsTimeout = setTimeout(() => (showControls = false), 2500);
    showControls = true;

    if (!(e.buttons & 1)) return; // mouse not down
    if (!duration) return; // video not loaded yet

    const { left, right } = this.getBoundingClientRect();
    time = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedown(e) {
    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves

    function handleMouseup() {
      if (paused) e.target.play();
      else e.target.pause();
      cancel();
    }

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup);
    }

    e.target.addEventListener("mouseup", handleMouseup);

    setTimeout(cancel, 200);
  }

  function format(seconds) {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  }
</script>

<style>
  .content {
    display: flex;
  }
  .bets {
    width: 100%;
    text-align: left;
    background-color: #fff;
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    position: relative;
  }

  .bet-container {
    display: flex;
    border-style: solid;
    border-width: 1px;
    border-color: #e3e3e3;
    width: 100%;
    position: relative;
  }
  .bet-take-container {
    display: flex;
    width: 100%;
    position: relative;
  }

  .bet-avatar {
    height: 30px;
    width: 30px;
    position: relative;
    top: -3px;
    margin-left: 0.5em;
    margin-top: 0.5em;
    margin-right: 0.5em;
  }

  .bet-slip {
    margin-top: 0.5em;
    margin-bottom: 1em;
    width: 100%;
    position: relative;
  }

  .comment-bet-username {
    color: #081e3e;
    font-weight: bold;
    padding-right: 0.3em;
  }

  .comment-bet-amount {
    float: right;
    padding-right: 0.3em;
    color: #081e3e;
    font-weight: bold;
  }

  .dice-img-bet-slip {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
  }

  .comment-bet-description {
    padding-left: 1em;
    color: #000;
  }

  .dice-img {
    height: 30px;
    width: 30px;
    position: relative;
    top: 9px;
    margin-right: 0.3em;
  }

  .bet-username {
    color: #888;
    font-weight: bold;
    padding-right: 0.3em;
  }

  .confirm-bet-avatar {
    height: 30px;
    width: 30px;
    position: relative;
    top: -10px;
    margin-left: 0.5em;
    margin-top: 0.5em;
    margin-right: 0.5em;
  }

  .video-stream {
    position: relative;
  }

  .controls {
    position: absolute;
    top: 0;
    width: 100%;
    transition: opacity 1s;
  }

  .info {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .controls .info span {
    padding: 0.2em 0.5em;
    color: white;
    text-shadow: 0 0 8px black;
    font-size: 1.4em;
    opacity: 0.7;
  }

  .time {
    width: 3em;
  }

  .time:last-child {
    text-align: right;
  }

  progress {
    display: block;
    width: 100%;
    height: 10px;
    -webkit-appearance: none;
    appearance: none;
  }

  progress::-webkit-progress-bar {
    background-color: rgba(0, 0, 0, 0.2);
  }

  progress::-webkit-progress-value {
    background-color: rgba(255, 255, 255, 0.6);
  }

  video {
    width: 100%;
  }
  .channel-content {
    width: 50%;
  }
</style>

<svelte:head>
  <title>trollfeast</title>
</svelte:head>

<Dialog
  bind:this={dialog}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content">
  <Title id="dialog-title">
    <span>
      <img class="dice-img" alt="" src="dice.png" />
      Take this bet?
    </span>
  </Title>
  <Content id="dialog-content">
    {#if bet != null}
      <div class="bet-take-container" transition:fade>
        <div>
          <img class="bet-avatar" alt="" src={bet.profileImage} />
        </div>
        <div class="bet-slip">
          <span class="comment-bet-username">{bet.username}</span>
          <span class="comment-bet-amount">Bet: {bet.amount} sats</span>
          <div bp="margin-top--lg" class="comment-bet-description">
            {bet.description}
          </div>
        </div>
      </div>
    {/if}
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={confirm} action="submit">
      <Label>Take it!</Label>
    </Button>
  </Actions>
</Dialog>

<div class="content">
  <div class="channel-content">
    <div class="video-stream">
      <video
        id="video"
        on:mousemove={handleMousemove}
        on:mousedown={handleMousedown}
        bind:currentTime={time}
        bind:duration
        bind:paused />

      <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
        <progress value={time / duration || 0} />

        <div class="info">
          <span class="time">{format(time)}</span>
          <span>
            click anywhere to {paused ? 'play' : 'pause'} / drag to seek
          </span>
          <span class="time">{format(duration)}</span>
        </div>
      </div>
    </div>
    <div class="bets">
      {#each bets as bet (bet.id)}
        <div class="bet-container" transition:fade>
          <div>
            <img class="bet-avatar" alt="" src={bet.profileImage} />
          </div>
          <div class="bet-slip">
            <span class="comment-bet-username">{bet.username}</span>
            <span class="comment-bet-amount">
              Bet: {bet.amount} sats
              {#if bet.username != user.username}
                <Button
                  color="primary"
                  on:click={() => openConfirm(bet)}
                  variant="outlined">
                  <Label>Take it!</Label>
                </Button>
              {:else}
                <Button
                  color="secondary"
                  on:click={() => removeBet(bet)}
                  variant="outlined">
                  <Label>Bounce</Label>
                </Button>
              {/if}
            </span>
            <div class="comment-bet-description">{bet.description}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <TrollBox handleAddBet={addBet} {user} />
</div>
