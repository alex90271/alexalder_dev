<main>
  <div class="header-card">
    <h1>Im Alex<br />Full stack developer</h1>
    <p>Let me bring your next idea alive with innovative software</p>
  </div>
    <div class="header-bar"> 
      <p> 
        Tools
        <br>
        Stuff
        <br>
      </p>  
    </div>
</main>

<style>

.header-bar {
    background-color: rgb(205, 194, 255);
    color: rgb(49, 49, 49);
    border-radius: 35px;
    margin: 5%;
    font-size: x-large;
    position: sticky;
    top:10px;   
}

.header-card {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    200deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  padding: 3em;
  margin: 2em;
  margin-bottom: 5em;
  height: 15em;
  min-width: 7.5em;
  border-radius: 2.5em;
  animation: gradient2 60s infinite normal ease-in;
}

@keyframes gradient2 {
  from {
    -webkit-filter: hue-rotate(180deg);
  }
  to {
    -webkit-filter: hue-rotate(-180deg);
  }
}

</style>