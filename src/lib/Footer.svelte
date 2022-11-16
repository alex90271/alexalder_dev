<script>
    import SocialButtons from "./SocialButtons.svelte";

</script>
<main>
    <div class='footer-bar'>
        <SocialButtons></SocialButtons>
    </div>
    
    <p class="footer">Made in DC</p>
  </main>

  <style>
.footer-bar {
    background-color: rgb(205, 194, 255);
    color: rgb(49, 49, 49);
    border-radius: 2.5em;
    margin: 5%;
    font-size: x-large;
    position: relative;
    z-index: 1; 
    }

.footer{
    color: white;
    position: relative;
    text-align: center;
}

  </style>