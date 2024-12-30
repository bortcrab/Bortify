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
        {#if playlists.length === 0}
            <h2>No playlists were found (. _ . )</h2>
        {/if}
        {#each playlists as playlist (playlist.id)}
            <div class="playlist-card">
                {#if playlist.images != null}
                    <div class="playlist-image-container">
                        <img
                            src={playlist.images[0].url}
                            alt="{`${playlist.name} cover`}"
                        />
                    </div>
                {:else}
                    <div class="playlist-no-image-container">
                        <img
                            src="images/music_note.png"
                            alt="Music note"
                        />
                    </div>
                {/if}
                <div class="playlist-title">
                    <p>{playlist.name}</p>
                </div>
            </div>
        {/each}
    </div>
</main>
