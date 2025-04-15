<script>
  import Footer from "./lib/Footer.svelte";
  import AnimatedCard from "./lib/AnimatedCard.svelte";
  import HeaderCard from "./lib/HeaderCard.svelte";
  import WavesClip from "./lib/WavesClip.svelte";
  import AnimatedHeader from "./lib/AnimatedHeader.svelte";
  import ContactCard from "./lib/ContactCard.svelte";
  import { onMount } from 'svelte';
  
  let darkMode = true;
  
  // Check for previously saved theme preference or system preference
  onMount(() => {
    // Apply the current theme (from body class) to our component state
    darkMode = !document.body.classList.contains('light-mode');
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      darkMode = savedTheme === 'dark';
      if (!darkMode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      darkMode = prefersDark;
      if (!darkMode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  });
  
  function toggleTheme() {
    darkMode = !darkMode;
    
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    
    // Save preference
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }
</script>

<div class="parallax-bg" class:light-mode={!darkMode}>
  <div class="parallax-stars"></div>
  {#if darkMode}
    {#each Array(20) as _, i}
      <div class="star"></div>
    {/each}
  {/if}
</div>

<main class:dark={darkMode} class:light={!darkMode} class="main">
  <div class="nav-container">
    <nav class="navbar">
      <div class="logo">Alder Automations</div>
      <div class="nav-links">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </div>
  
  <HeaderCard />
  
  <section id="services">
    <AnimatedHeader section_header="Services" />
    <div class="card-section">
      <AnimatedCard
        card_header="Wordpress"
        card_desc="Install, Design, Host, and Manage your Wordpress Site"
        call_to_action="Get in touch"
        call_to_action_link="#contact"
      />
      <AnimatedCard
        card_header="Websites"
        card_desc="Install, Design, Host, and Manage your Site"
        call_to_action="Get in touch"
        call_to_action_link="#contact"
      />
      <AnimatedCard
        card_header="Consulting"
        card_desc="IT / Software consulting sessions"
        call_to_action="Get in touch"
        call_to_action_link="#contact"
      />
      <AnimatedCard
        card_header="Hosting"
        card_desc="Provision hosting. Includes domain and SSL setup"
        call_to_action="Get in touch"
        call_to_action_link="#contact"
      />
    </div>
  </section>
  
  <section id="work">
    <AnimatedHeader section_header="Previous Work" />
    <div class="card-section">
      <AnimatedCard
        card_header="Mandarin"
        card_desc="Designed this Restaurant website with wordpress"
        call_to_action="Visit mandarinutah.com"
        call_to_action_link="https://mandarinutah.com"
      />
      <AnimatedCard
        card_header="Python Payroll"
        card_desc="Designed a POS integrated payroll calculation system"
        call_to_action="Github"
        call_to_action_link="https://github.com/alex90271/pos_pyroll"
      />
      <AnimatedCard
        card_header="Text to Speech"
        card_desc="Custom flutter text to speech application built from the google text to speech engine"
        call_to_action="Github"
        call_to_action_link="https://github.com/alex90271/flutter-text-to-speech"
      />
      <AnimatedCard
        card_header="This website"
        card_desc="Alderautomations, built with Svelte"
        call_to_action="Github"
        call_to_action_link="https://github.com/alex90271/alexalder_dev"
      />
    </div>
  </section>
  
  <section id="contact">
    <ContactCard />
  </section>
</main>

<style>
  :global(body) {
    background-color: var(--bg-dark);
    transition: background-color 0.5s ease;
  }

  .parallax-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background-color: var(--bg-dark);
    transition: background-color 0.5s ease;
  }

  .main {
    color: var(--text-light);
    padding-top: 80px;
    position: relative;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
  }

  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(18, 18, 18, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    width: 100%;
    box-sizing: border-box;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo {
    font-family: 'Lovelo', sans-serif;
    font-size: 1.25rem;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .nav-links a {
    color: var(--text-light);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    font-size: 0.9rem;
  }

  .nav-links a:hover {
    color: var(--primary);
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    transition: width 0.3s ease;
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-light);
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(15deg);
  }

  section {
    margin: 3rem 0;
    padding: 1rem 0;
    width: 100%;
    box-sizing: border-box;
  }

  /* Light mode styles */
  :global(body.light-mode) {
    --bg-dark: #f5f5f7;
    --text-light: #232323;
    --text-dark: #121212;
  }
  
  :global(body.light-mode) .nav-container {
    background: rgba(245, 245, 247, 0.8);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  :global(body.light-mode) .theme-toggle {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-dark);
  }
  
  :global(body.light-mode) .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .navbar {
      padding: 0.75rem 1rem;
    }

    .nav-links {
      gap: 0.75rem;
    }

    .nav-links a {
      font-size: 0.8rem;
    }

    .theme-toggle {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }

    section {
      margin: 2rem 0;
      padding: 0.5rem 0;
      width: 100%;
      box-sizing: border-box;
    }

    .main {
      padding-top: 60px;
    }
  }
</style>
