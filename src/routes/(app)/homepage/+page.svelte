<script>
    import "../../../lib/styles/global.css";
    import "../../../lib/styles/homepage.css";

    export let data;
    $: user = data.user;
    $: loggedIn = data.loggedIn;
    $: playlists = data.playlists || [];
</script>

<main>
    <h1>Welcome, {user.display_name}</h1>
    <div class="playlist-container">
        {#each playlists as playlist (playlist.id)}
            <div class="playlist-card">
                <div class="playlist-image">
                    <img src={playlist.images[0].url} alt={`${playlist.name} cover`};/>
                </div>
                <div class="playlist-title">
                    <p>{playlist.name}</p>
                </div>
            </div>
        {/each}
    </div>
</main>
