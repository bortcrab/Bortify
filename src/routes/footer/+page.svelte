<script>
    import "../../lib/styles/global.css";
    import "../../lib/styles/footer.css";
</script>

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
