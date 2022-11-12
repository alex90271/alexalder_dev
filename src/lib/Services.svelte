<script>
  import IntersectionObserver from "svelte-intersection-observer";
  let hiddenCard;
  let cardIntersected = false;
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
    <h1
      bind:this={hiddenCard}
      class={cardIntersected ? "section-header hidden" : "section-header shown"}
    >
      Services
    </h1>
    <div class="grid3">
      <div
        bind:this={hiddenCard}
        class={cardIntersected ? "card hidden" : "card shown"}
      >
        <h1>Web and UX/UI Design</h1>
      </div>
      <div
        bind:this={hiddenCard}
        class={cardIntersected ? "card hidden" : "card shown"}
      >
        <h1>Custom software development</h1>
      </div>
      <div
        bind:this={hiddenCard}
        class={cardIntersected ? "card hidden" : "card shown"}
      >
        <h1>Hosting Services</h1>
      </div>
    </div>
  </IntersectionObserver>
</main>
