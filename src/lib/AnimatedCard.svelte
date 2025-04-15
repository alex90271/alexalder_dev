<script>
  import { onMount } from 'svelte';
  import IntersectionObserver from './IntersectionObserver.svelte';

  export let card_header;
  export let card_desc;
  export let call_to_action;
  export let call_to_action_link;
  
  // Check if the link is a GitHub link or contact link
  $: isGitHubLink = call_to_action_link?.includes('github.com');
  $: isContactLink = call_to_action_link === '#contact';
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
            <a href={call_to_action_link} target={!isContactLink ? "_blank" : ""} rel={!isContactLink ? "noopener noreferrer" : ""} class="cta-button">
              {#if isGitHubLink}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="github-icon" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              {/if}
              {#if isContactLink}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              {/if}
              {call_to_action}
            </a>
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
            <a href={call_to_action_link} target={!isContactLink ? "_blank" : ""} rel={!isContactLink ? "noopener noreferrer" : ""} class="cta-button">
              {#if isGitHubLink}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="github-icon" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              {/if}
              {#if isContactLink}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              {/if}
              {call_to_action}
            </a>
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

.github-icon {
  margin-right: 0.5rem;
  vertical-align: middle;
}

.icon {
  margin-right: 0.5rem;
  vertical-align: middle;
}

a {
  display: inline-flex;
  align-items: center;
  /* Your existing link styles */
}
</style>
