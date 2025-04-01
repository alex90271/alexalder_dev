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
    <div class="card-container">
      <div class={"card shown"}>
        <div class="card-content">
          <h2 class="card-title">
            {card_header}
          </h2>
          <p class="card-description">
            {card_desc}
          </p>
          {#if call_to_action}
            <a href="javascript:void(0)" class="cta-button">{call_to_action}</a>
          {/if}
        </div>
        <div class="card-glow"></div>
      </div>
    </div>
    {:else}
    <div class="card-container">
      <div class={"card hidden"}>
        <div class="card-content">
          <h2 class="card-title">
            {card_header}
          </h2>
          <p class="card-description">
            {card_desc}
          </p>
          {#if call_to_action}
            <a href="javascript:void(0)" class="cta-button">{call_to_action}</a>
          {/if}
        </div>
        <div class="card-glow"></div>
      </div>
    </div>
    {/if}
  </IntersectionObserver>
</main>

<style>
.card-container {
  position: relative;
  perspective: 1000px;
}

.card {
  position: relative;
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 2rem;
  min-height: 12rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
}

.card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 12px 40px 0 rgba(52, 144, 222, 0.3);
}

.card-glow {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  border-radius: 50%;
  filter: blur(15px);
}

.card:hover .card-glow {
  opacity: 0.15;
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
}

.card-title {
  font-family: 'Lovelo', sans-serif;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: var(--text-light);
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-description {
  color: var(--text-light);
  font-weight: 300;
  line-height: 1.5;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 144, 222, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(52, 144, 222, 0.6);
}

.shown {
  opacity: 1;
  filter: blur(0);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateX(0) translateY(0);
}

.hidden {
  opacity: 0;
  filter: blur(5px);
  transform: translateX(-50px) translateY(20px);
}

:global(body.light-mode) .card {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

:global(body.light-mode) .card-description {
  color: var(--text-dark);
}

:global(body.light-mode) .card:hover {
  box-shadow: 0 12px 30px rgba(52, 144, 222, 0.2);
}

@media(prefers-reduced-motion) {
  .hidden {
    transition: none;
  }
}
</style>
