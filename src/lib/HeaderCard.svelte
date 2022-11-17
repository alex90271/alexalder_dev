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
    background: rgb(34, 193, 195);
  background: linear-gradient(
    200deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  text-align: center;
  padding: 5%;
  margin: 5%;
  height: 15em;
  min-width: 7.5em;
  border-radius: 2.5em;
  animation: header-animation 15s infinite normal ease-in;
  }
  .header-card:hover {
    animation-duration: 1s;
  }

  .header {
    transition: 3s;
    color:white;
    top: 0;
      padding: 1%;
      transition: 3s;
  }

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

  @media only screen and (min-width: 600px) {
    .header {
      top: 0;
      padding: 1%;
      transition: 3s;
    }
    .header-card {
      margin: 2.5%;
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
