<script>
  import { onMount } from 'svelte';
  
  import IntersectionObserver from './IntersectionObserver.svelte';

  export let card_header;
  export let card_desc;
  export let call_to_action;
</script>

<main>
  <IntersectionObserver let:intersecting top={400}>
  {#if intersecting}
    <div>
      <div class={"card shown"}>
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
    {:else}
    <div>
      <div class={"card hidden"}>
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
    {/if}
  </IntersectionObserver>
</main>



<style>
.card {
  background-color: lightblue;
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
