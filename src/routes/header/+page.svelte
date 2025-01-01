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
        const searchQuery = document.getElementById("search").value;
        const currentUrl = window.location.href;
        const newUrl = `/searchResult/${searchQuery}`;

        console.log(currentUrl);

        // Verificar si ya estamos en la misma página
        if (currentUrl.includes("/searchResult/")) {
            goto(newUrl);
        } else {
            goto(newUrl);
        }
    }
</script>

<header>
    <button class="logo" on:click={handleGoHome}>Bortify</button>
    <div class="search">
        <div class="search-input">
            <input type="text" name="search" id="search" placeholder="Search" />
            <div class="bottom-border"></div>
        </div>
        <button on:click={handleSearch}>
            <img src="/images/magnifying_glass.png" alt="Magnifying glass" />
        </button>
    </div>
    <button class="logout" on:click={handleLogout}>Log out</button>
</header>
