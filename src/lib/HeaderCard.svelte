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
  background: linear-gradient(225deg, #84dccfff, #a6d9f7ff, #bccce0ff, #bf98a0ff);
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

  @media only screen and (min-width: 600px) {
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
