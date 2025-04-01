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
      <div class="cards-container">
        <div class="rainbow-card"></div>
        <div class="card header-card">
          <div class="header-content">
            <h1 class="header-title">I'm Alex<br /><span class="highlight">Full stack developer</span></h1>
            <p class="header-subtitle">Let me bring your next idea alive with innovative software</p>
            <a href="#contact" class="cta-button primary">Get in touch</a>
          </div>
          <div class="animated-shape shape1"></div>
          <div class="animated-shape shape2"></div>
          <div class="animated-shape shape3"></div>
        </div>
      </div>
    </div>
  </IntersectionObserver>
</main>

<style>
.cards-container {
  position: relative;
  width: 100%;
  margin: 2rem 0;
}

.rainbow-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    -45deg, 
    #ff0000, #ff7f00, #ffff00, 
    #00ff00, #0000ff, #4b0082, #8b00ff
  );
  background-size: 400% 400%;
  animation: rgb-border-animation 10s ease infinite;
  border-radius: 24px;
  filter: blur(1.5rem);
  opacity: 0.5;
  z-index: 0;
  transform: scale(1.02);
}

.header-card {
  position: relative;
  z-index: 1;
  background: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 3rem;
  min-height: 20rem;
  overflow: hidden;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  isolation: isolate;
}

.header-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 3px;
  border-radius: 24px;
  background: linear-gradient(
    -45deg, 
    #ff0000, #ff7f00, #ffff00, 
    #00ff00, #0000ff, #4b0082, #8b00ff
  );
  background-size: 400% 400%;
  animation: rgb-border-animation 10s ease infinite;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 0;
  filter: blur(1.5rem);
  opacity: 0.8;
}

.header-card::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  padding: 8px;
  border-radius: 24px;
  background: linear-gradient(
    -45deg, 
    #ff0000, #ff7f00, #ffff00, 
    #00ff00, #0000ff, #4b0082, #8b00ff
  );
  background-size: 400% 400%;
  animation: rgb-border-animation 10s ease infinite;
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 0;
  filter: blur(1.5rem);
  opacity: 0.5;
}

@keyframes rgb-border-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

:global(body.light-mode) .header-card {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border: none;
}

:global(body.light-mode) .header-subtitle {
  color: var(--text-dark);
}

:global(body.light-mode) .animated-shape {
  opacity: 0.3;
}

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.header-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-out;
}

.highlight {
  font-size: 2.5rem;
}

.header-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  animation: fadeIn 1.2s ease-out;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: slideUp 1.5s ease-out;
}

.cta-button.primary {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  box-shadow: 0 8px 20px rgba(52, 144, 222, 0.5);
}

.cta-button.primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(52, 144, 222, 0.7);
}

.animated-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  z-index: 1;
}

.shape1 {
  width: 300px;
  height: 300px;
  background: var(--primary);
  top: -100px;
  left: -100px;
  animation: move1 20s infinite alternate;
}

.shape2 {
  width: 200px;
  height: 200px;
  background: var(--secondary);
  bottom: -50px;
  right: -50px;
  animation: move2 15s infinite alternate;
}

.shape3 {
  width: 150px;
  height: 150px;
  background: var(--accent);
  bottom: 50px;
  left: 30%;
  animation: move3 18s infinite alternate;
}

@keyframes move1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes move2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-30px, -30px); }
}

@keyframes move3 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, -40px); }
}

@media only screen and (min-width: 768px) {
  .header-card {
    padding: 4rem;
  }
  
  .header-card::before {
    padding: 4px;
    filter: blur(1.5rem);
  }
  
  .header-card::after {
    padding: 10px;
    filter: blur(1.5rem);
  }
  
  .header-title {
    font-size: 4.5rem;
  }
  
  .highlight {
    font-size: 3rem;
  }
}
</style>
