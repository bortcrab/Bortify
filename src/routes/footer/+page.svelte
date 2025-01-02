<script>
    import "../../lib/styles/global.css";
    import "../../lib/styles/footer.css";
    import { onMount } from "svelte";

    let player;
    let is_paused = true;
    let current_track = {};
    let device_id = null;
    let current_track_img = "";

    onMount(async () => {
        const response = await fetch("/api/auth/readToken");
        const { token } = await response.json();

        if (!token) {
            console.error("No token found.");
            return;
        }

        // Load SDK
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            player = new Spotify.Player({
                name: "Bortify",
                getOAuthToken: (cb) => {
                    cb(token);
                },
                volume: 0.1,
            });

            // Ready
            player.addListener("ready", ({ device_id }) => {
                //console.log("Ready with Device ID", device_id);
            });

            // Not Ready
            player.addListener("not_ready", ({ device_id }) => {
                //console.log("Device ID has gone offline", device_id);
            });

            player.addListener("initialization_error", ({ message }) => {
                //console.error(message);
            });

            player.addListener("authentication_error", ({ message }) => {
                console.error(message);
            });

            player.addListener("account_error", ({ message }) => {
                console.error(message);
            });

            player.addListener("player_state_changed", (state) => {
                if (!state) return;
                current_track = state.track_window.current_track;
                current_album = current_track.album;
                current_track_url = current_album.images[0].url;
                current_artist = current_track.artists.map((artist) => artist.name).join(", ");
                is_paused = state.paused;
            });

            document.getElementById("togglePlay").onclick = function () {
                player.togglePlay();
            };

            player.connect();
        };
    });

    const togglePlay = async () => {
        const state = await player.getCurrentState();
        if (!state) {
        console.error("User is not playing music through the Web Playback SDK");
        return;
        }

        if (state.paused) player.resume();
        else player.pause();
    };
</script>

<footer>
    <div class="song-data">
        {#if current_track_img !== ""}
            <img src={current_track_img} alt="Artwork of song playing" />
            <span>
                <p>Title: Song title...</p>
                <p>Album: Album title...</p>
                <p>Artist: Artist name...</p>
            </span>
        {/if}
    </div>
    <div class="playing-info">
        <button id="togglePlay">
            <img src="/images/play.png" alt="Play button" />
        </button>
        <div class="progression">
            <p>1:06</p>
            <input
                type="range"
                class="progress-bar"
                min="0"
                max="200"
                value="0"
                step="1"
                name="progress-bar"
                id="progress-bar"
            />
            <p>3:54</p>
        </div>
    </div>
</footer>
