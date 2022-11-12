<script>
  import Projects from "./lib/Projects.svelte";
  import Services from "./lib/Services.svelte";
</script>

<main class="main">
  <div class="grid2">
    <div>
      <div class="card">
        <h1 class="barcodeText">Im Alex<br />Full stack developer</h1>
        <p>Let me bring your next idea alive with innovative software</p>
      </div>
    </div>
    <div class="card">
      <ul class="unbulleted-list">
        <li>Custom software</li>
        <li>Design, Build, and Deploy your website</li>
        <li>Implement automated data managment</li>
        <li>Provide meaningful insight</li>
      </ul>
    </div>
  </div>
  <Projects />
  <Services />
</main>

<style>
</style>
