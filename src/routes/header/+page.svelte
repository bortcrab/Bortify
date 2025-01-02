<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import "../../lib/styles/global.css";
    import "../../lib/styles/header.css";

    let searchQuery = "";
    let currentSearchQuery = "";

    onMount(() => {
        // Load value from local storage.
        currentSearchQuery = localStorage.getItem("currentSearchQuery") || "";
    });
    
    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST" });

            window.location.href = "/login";
        } catch (error) {
            console.error("There was an error trying to log out:", error);
        }
    }

    function handleGoHome() {
        localStorage.setItem("currentSearchQuery", "");
        window.location.href = "/homepage";
    }

    function handleSearch() {
        searchQuery = document.getElementById("search-bar").value;

        localStorage.setItem("currentSearchQuery", searchQuery);

        if (searchQuery === "") {
            return;
        }

        const newUrl = `/searchResult/${searchQuery}`;

        window.location.href = newUrl;
    }
</script>

<header>
    <button class="logo" on:click={handleGoHome}>Bortify</button>
    <form class="search" on:submit|preventDefault={handleSearch}>
        <div class="search-input">
            <input type="text" name="search-bar" id="search-bar" placeholder="Search" value={currentSearchQuery}/>
            <div class="bottom-border"></div>
        </div>
        <button type="submit">
            <img src="/images/magnifying_glass.png" alt="Magnifying glass" />
        </button>
    </form>
    <button class="logout" on:click={handleLogout}>Log out</button>
</header>
