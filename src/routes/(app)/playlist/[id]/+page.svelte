<script>
    import "../../../../lib/styles/playlist.css";
    import { onMount } from "svelte";

    export let data;
    let playlist = data.playlist;
    let songs = playlist.tracks.items || [];
    let loading = false;
    let nextUrl = playlist.tracks.next;

    const loadSongs = async () => {
        // Do nothing if already loading or if there are no more songs to load
        if (loading || !nextUrl) return;
        loading = true;

        try {
            // Fetch the next batch of songs
            const response = await fetch("/api/app/loadSongs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nextUrl }),
            });

            const data = await response.json();

            // Add the new songs to the list
            songs = [...songs, ...data.items];
            // Update the next URL to fetch more songs
            nextUrl = data.next;
        } catch (error) {
            console.error("Error fetching more songs:", error);
        } finally {
            loading = false;
            console.log(songs.length);
        }
    };

    // Function to handle the scroll event
    const handleScroll = (event) => {
        // Get the scroll container, its scroll position and height
        const container = event.target;
        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollHeight = scrollContainer.scrollHeight;

        // Load more songs if the user has scrolled to the bottom 85% of the container
        if (scrollPosition >= scrollHeight * 0.85) {
            loadSongs();
        }
    };

    // Add the scroll event listener when the component mounts
    onMount(() => {
        const scrollContainer = document.querySelector("main");
        scrollContainer.addEventListener("scroll", handleScroll);
    });
</script>

<main>
    <div class="container">
        {#if songs.length === 0}
            <h2>No songs were found in this playlist (. _ . )</h2>
        {:else}
            <div class="playlist-data">
                <div class="image-container">
                    <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        cover
                    />
                    <button class="overlay-button" aria-label="Play"
                        ><i class="fa-solid fa-play"></i></button
                    >
                </div>
                <div class="playlist-info">
                    <h1>{playlist.name}</h1>
                    <h3>{playlist.description}</h3>
                </div>
            </div>
            <div class="song-list">
                {#each songs as song}
                    <div class="song-item">
                        {#if song.track.album.images[0] != null}
                            <div class="song-image-container">
                                <img
                                    src={song.track.album.images[0].url}
                                    alt={song.track.name}
                                    artwork
                                />
                            </div>
                        {:else}
                            <div class="song-no-image-container">
                                <img
                                    src="/images/music_note.png"
                                    alt="Music note"
                                />
                            </div>
                        {/if}
                        <div class="song-info">
                            <p><b>{song.track.name}</b></p>
                            <p><i>{song.track.album.name}</i></p>
                            <p>
                                <u
                                    >{song.track.artists
                                        .map((artist) => artist.name)
                                        .join(", ")}</u
                                >
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</main>
