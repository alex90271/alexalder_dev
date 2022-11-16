<script>
  import { onMount } from 'svelte';
  
  import IntersectionObserver from "svelte-intersection-observer";
  let hiddenCard;
  let cardIntersected = false;

  export let card_header;
  export let card_desc;
  export let call_to_action;
</script>

<main>
  <IntersectionObserver
    element={hiddenCard}
    on:observe={(e) => {
      if (!e.detail.isIntersecting) {
        cardIntersected = true;
        console.log("intersecting");
      } else {
        cardIntersected = false;
        console.log("not intersecting");
      }
    }}
  >
    <div>
      <div bind:this={hiddenCard} class={cardIntersected ? "card hidden" : "card shown"}>
        <h1>
          {card_header}
        </h1>
        <p>
          {card_desc}
        </p>
        <p>
          {call_to_action}
        </p>
      </div>
    </div>
  </IntersectionObserver>
</main>

<style>
.card {
  background-color: grey;
  margin: 5%;
  border-radius: 2.5em;
  min-height: 10em;
  padding: 5%;
}

.shown {
  opacity: 1;
  filter: blur(0);
  transition: all 1s;
  transform: translateX(0);
}

.hidden {
 opacity: 0;
 filter: blur(5px);
 transform: translateX(-100%)
}


@media(prefers-reduced-motion) {
  .hidden {
    transition: none;
  }
}
</style>
