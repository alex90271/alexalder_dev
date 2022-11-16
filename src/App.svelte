<script>
  import Footer from "./lib/Footer.svelte";
  import AnimatedCard from "./lib/AnimatedCard.svelte";
  import HeaderCard from "./lib/HeaderCard.svelte";
  import WavesClip from "./lib/WavesClip.svelte";
</script>

<main class="main">
  <HeaderCard />
  <div>
    <AnimatedCard
      section_header="Services"
      card_header="Wordpress"
      card_desc="Install, Design, Host, and Manage your Wordpress Site"
      call_to_action="Contact Now"
    />
    <AnimatedCard
      section_header=""
      card_header="Websites"
      card_desc="Install, Design, Host, and Manage your Site"
      call_to_action="Contact Now"
    />
    <AnimatedCard
      section_header=""
      card_header="Consulting"
      card_desc="IT / Software consulting sessions"
      call_to_action=""
    />
    <AnimatedCard
      section_header=""
      card_header="Hosting"
      card_desc="Provision hosting. Includes domain and SSL setup"
      call_to_action=""
    />
  </div>
  <div>
    <AnimatedCard
      section_header="Previous Work"
      card_header="Mandarin"
      card_desc=""
      call_to_action=""
    />
    <AnimatedCard
      section_header=""
      card_header="Python Payroll"
      card_desc=""
      call_to_action=""
    />
    <AnimatedCard
      section_header=""
      card_header="Text to Speech"
      card_desc=""
      call_to_action=""
    />
    <AnimatedCard
      section_header=""
      card_header="This website"
      card_desc=""
      call_to_action=""
    />
  </div>
  <WavesClip />
  <Footer />
</main>

<style>

@media only screen and (min-width: 600px) {
  div{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
