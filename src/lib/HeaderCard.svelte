<script>
  import SocialButtons from "./SocialButtons.svelte";
  import IntersectionObserver from "svelte-intersection-observer";

  let headerCard;
  let cardIntersected;
</script>

<main>
  <IntersectionObserver
    element={headerCard}
    on:observe={(e) => {
      if (e.detail.isIntersecting) {
        cardIntersected = true;
        console.log("intersecting");
      } else {
        cardIntersected = false;
        console.log("not intersecting");
      }
    }}
  >
    <div
      class={cardIntersected
        ? "header hidden"
        : "header shown"}
    >
      <h1>Alder Automations</h1>
    </div>
    <div bind:this={headerCard}>
      <div class="card header-card">
        <h1>Im Alex<br />Full stack developer</h1>

        <p>Let me bring your next idea alive with innovative software</p>
      </div>
    </div>
  </IntersectionObserver>
</main>

<style>
  .header-card {
    position: relative;
    z-index: 1;
  }

  .header {
    position: fixed;
    top: 0;
    z-index: 1;
    transition: 3s;
    color:white;
  }

  .shown {
    opacity: 1;
    filter: blur(0);
    transition: all 1s;
    padding: 1%;
  }

  .hidden {
    opacity: 0;
    filter: blur(5px);
    padding: 3%;
  }

  @media only screen and (min-width: 600px) {
    .header {
      top: 0;
      padding: 1%;
      transition: 3s;
    }
    /*reverse effects for desktop*/
    .shown {
      opacity: 0;
      filter: blur(5px);
      padding: 3%;
    }

    .hidden {
      opacity: 1;
      filter: blur(0);
      transition: all 1s;
    }
  }

  @keyframes header-animation {
    from {
      -webkit-filter: hue-rotate(180deg);
    }
    to {
      -webkit-filter: hue-rotate(-180deg);
    }
  }
</style>
