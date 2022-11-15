<script>
  import Footer from "./lib/Footer.svelte";
  import AnimatedCard from "./lib/AnimatedCard.svelte";
  import HeaderCard from "./lib/HeaderCard.svelte";
</script>

<main class="main">
  <HeaderCard/>
  <AnimatedCard section_header='Services' card_header='Wordpress' card_desc='Install, Design, Host, and Manage your Wordpress Site' call_to_action='Contact Now'/>
  <AnimatedCard section_header='' card_header='Websites' card_desc='Install, Design, Host, and Manage your Site' call_to_action='Contact Now'/>
  <Footer />
</main>

<style>
</style>
