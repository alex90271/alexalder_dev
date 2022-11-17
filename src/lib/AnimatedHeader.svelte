<script>
    import { onMount } from 'svelte';
    
    import IntersectionObserver from "svelte-intersection-observer";
    let hiddenCard;
    let cardIntersected = false;
  
    export let section_header;
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
    </IntersectionObserver>
  </main>
  
  <style>
    
  .section-header {
    margin: 7.5%;
    text-align: center;
    color: #FFF;
    position: inherit;
  }
  
  .shown {
    opacity: 1;
    filter: blur(0);
    transition: all 1s;
  }
  
  .hidden {
   opacity: 0;
   filter: blur(5px);
  }
  
  
  @media(prefers-reduced-motion) {
    .hidden {
      transition: none;
    }
  }
  </style>
  