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
        } else {
          cardIntersected = false;
        }
      }}
    >
      <div class="section-header-container">
        <h2 bind:this={hiddenCard} class={cardIntersected ? "section-header hidden" : "section-header shown"}>
          {section_header}
        </h2>
        <div class="header-line"></div>
      </div>
    </IntersectionObserver>
  </main>
  
  <style>
  .section-header-container {
    text-align: center;
    margin: 4rem 0 2rem;
    position: relative;
  }
  
  .section-header {
    display: inline-block;
    font-family: 'Lovelo', sans-serif;
    font-size: 2.5rem;
    margin: 0 0 1rem;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }
  
  .header-line {
    width: 80px;
    height: 4px;
    margin: 0 auto;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 2px;
    transform-origin: center;
    animation: pulse 2s infinite;
  }
  
  .shown {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .hidden {
    opacity: 0;
    filter: blur(5px);
    transform: translateY(30px);
  }
  
  @media(prefers-reduced-motion) {
    .hidden {
      transition: none;
    }
  }
  
  @media only screen and (min-width: 768px) {
    .section-header {
      font-size: 3rem;
    }
    
    .header-line {
      width: 120px;
    }
  }
  </style>
  