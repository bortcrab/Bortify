<script>
    import { goto } from '$app/navigation';
    
    import "../../../lib/styles/global.css";
    import "../../../lib/styles/homepage.css";

    

    export let data;
    $: user = data.user;
    $: playlists = data.playlists || [];

    function showPlaylist(id) {
        goto(`/playlist/${id}`);
    }
</script>

<main>
    <h1>Welcome, {user.display_name}</h1>
    <div class="playlist-container">
        {#if playlists.length === 0}
            <h2>No playlists were found (. _ . )</h2>
        {/if}

        {#each playlists as playlist (playlist.id)}
            <button
                type="button"
                class="playlist-card"
                on:click={() => showPlaylist(playlist.id)}
            >
                {#if playlist.images != null}
                    <div class="playlist-image-container">
                        <img
                            src={playlist.images[0].url}
                            alt={`${playlist.name} cover`}
                        />
                    </div>
                {:else}
                    <div class="playlist-no-image-container">
                        <img src="images/music_note.png" alt="Music note" />
                    </div>
                {/if}
                <div class="playlist-title">
                    <p>{playlist.name}</p>
                </div>
            </button>
        {/each}
    </div>
</main>
