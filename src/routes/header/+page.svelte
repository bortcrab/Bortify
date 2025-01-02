<script>
    import { goto } from "$app/navigation";
    import "../../lib/styles/global.css";
    import "../../lib/styles/header.css";

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

    function handleSearch() {
        const searchQuery = document.getElementById("search-bar").value;
        if (searchQuery === "") {
            return;
        }
        const currentUrl = window.location.href;
        const newUrl = `/searchResult/${searchQuery}`;

        window.location.href = newUrl;
    }
</script>

<header>
    <button class="logo" on:click={handleGoHome}>Bortify</button>
    <form class="search" on:submit|preventDefault={handleSearch}>
        <div class="search-input">
            <input type="text" name="search-bar" id="search-bar" placeholder="Search" />
            <div class="bottom-border"></div>
        </div>
        <button type="submit">
            <img src="/images/magnifying_glass.png" alt="Magnifying glass" />
        </button>
    </form>
    <button class="logout" on:click={handleLogout}>Log out</button>
</header>