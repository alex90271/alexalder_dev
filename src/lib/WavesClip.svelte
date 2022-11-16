<script>

</script>

<main>
    <svg class="wave top-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L48,224C96,192,192,128,288,96C384,64,480,64,576,90.7C672,117,768,171,864,181.3C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
      <svg class="wave bottom-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0099ff" fill-opacity="1" d="M0,224L120,240C240,256,480,288,720,272C960,256,1200,192,1320,160L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
      </svg>
</main>

<style>

.wave {
  color: lightblue;
  position: fixed;
  width: 100%
}

.top-wave{
  top: 0;
}
.bottom-wave{
  bottom: 0;
}

@media only screen and (min-width: 600px) {
    .wave{
        z-index: -1;
    }
  
}

</style>