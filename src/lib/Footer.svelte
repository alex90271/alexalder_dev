<script>
    import SocialButtons from "./SocialButtons.svelte";
</script>

<main>
    <div class="footer-bar">
        <SocialButtons />
    </div>
</main>

<style>
    .footer-bar {
        background-color: var(--tuscany);
        color: var(--jet);
        border-radius: 2.5em;
        margin: 5%;
        font-size: x-large;
        position: relative;
        z-index: 1;
        transition: all 5s;
        padding-left: 10%;
        padding-right: 10%;
        padding-top:2.5%;
        padding-bottom:2.5%;
    }
    .footer-bar:hover {
        animation: animation 2s infinite normal ease-in;
    }
    @keyframes animation {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(360deg);
    }
    }
    @media only screen and (min-width: 600px) {
    .footer-bar {
        margin: 2.5%;
        margin-bottom: 10%;
    
    }
}
</style>
