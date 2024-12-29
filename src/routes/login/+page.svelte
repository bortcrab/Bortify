<script>
    import "../../lib/styles/login.css";
    import "../../lib/styles/global.css";

    import { onMount } from "svelte";

    let authUrl = "";

    onMount(async () => {
        const res = await fetch("/api/auth");
        const data = await res.json();
        authUrl = data.auth_url;
    });

    function handleLogin() {
        window.location.href = authUrl;
    }
</script>

<main>
    <h1>Bortify</h1>
    <button on:click={handleLogin}>Login with Spotify</button>
</main>
