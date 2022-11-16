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
        background-color: lightblue;
        color: rgb(49, 49, 49);
        border-radius: 2.5em;
        margin: 5%;
        font-size: x-large;
        position: relative;
        z-index: 1;
    }

    @media only screen and (min-width: 600px) {
    .footer-bar {
        background-color: lightblue;
        color: rgb(49, 49, 49);
        border-radius: 2.5em;
        margin: 5%;
        font-size: x-large;
        position: relative;
        z-index: 1;
    }

    }
</style>
