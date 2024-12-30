<script>
    import "../../lib/styles/global.css";
    import "../../lib/styles/header.css";
    import "../../lib/styles/footer.css";

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST" });

            window.location.href = "/login";
        } catch (error) {
            console.error("There was an error trying to log out:", error);
        }
    }

    function handleGoHome() {
        window.location.href = "/homepage";
    }
</script>

<header>
    <button class="logo" on:click={handleGoHome}>Bortify</button>
    <div class="search">
        <div class="search-input">
            <input type="text" name="search" id="search" placeholder="Search" />
            <div class="bottom-border"></div>
        </div>
        <img src="/images/magnifying_glass.png" alt="Magnifying glass" />
    </div>
    <button class="logout" on:click={handleLogout}>Log out</button>
</header>

<slot />

<footer>
    <div class="song-data">
        <img src="/images/img_placeholder.jpg" alt="Artwork of song playing" />
        <span>
            <p>Title: Song title...</p>
            <p>Album: Album title...</p>
            <p>Artist: Artist name...</p>
        </span>
    </div>
    <div class="playing-info">
        <img src="/images/play.png" alt="Play button" />
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
