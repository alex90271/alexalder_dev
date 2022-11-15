<script>
  import { onMount } from 'svelte';
  
  import IntersectionObserver from "svelte-intersection-observer";
  let hiddenCard;
  let cardIntersected = false;

  export let section_header;
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
    <h1 bind:this={hiddenCard} class={cardIntersected ? "section-header hidden" : "section-header shown"}>
      {section_header}
    </h1>
    <div class="grid">
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
  background: rgb(34, 193, 195);
  background: linear-gradient(
    200deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  padding: 3em;
  margin: 2em;
  margin-bottom: 5em;
  height: 15em;
  min-width: 7.5em;
  border-radius: 2.5em;
  animation: gradient3 60s infinite normal ease-in;
}
  
.section-header {
  text-align: center;
  color: #FFF;
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
.card:nth-child(1) {
  animation: gradient1 60s infinite normal ease-in;
}

.card:nth-child(2) {
  animation: gradient4 60s infinite normal ease-in;
}

.shown:nth-child(1) {
  transition-delay: 200ms;
}

.shown:nth-child(2) {
  transition-delay: 400ms;
}

.shown:nth-child(3) {
  transition-delay: 600ms;
}


@keyframes gradient1 {
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(360deg);
  }
}

@keyframes gradient3 {
  from {
    -webkit-filter: hue-rotate(90deg);
  }
  to {
    -webkit-filter: hue-rotate(-270deg);
  }
}
@keyframes gradient4 {
  from {
    -webkit-filter: hue-rotate(300deg);
  }
  to {
    -webkit-filter: hue-rotate(-60deg);
  }
}



@media(prefers-reduced-motion) {
  .hidden {
    transition: none;
  }
}
</style>
