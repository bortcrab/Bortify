<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import "../../lib/styles/global.css";
    import "../../lib/styles/header.css";

    let searchQuery = $state("");
    let currentSearchQuery = $state("");

    onMount(() => {
        // Cargar el valor de localStorage si existe
        currentSearchQuery = localStorage.getItem("currentSearchQuery") || "";
        console.log(currentSearchQuery);
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
        // Limpiar las variables de búsqueda
        searchQuery = "";
        currentSearchQuery = "";

        // Eliminar el valor de búsqueda almacenado en localStorage
        localStorage.removeItem("currentSearchQuery");

        // Redirigir al inicio
        goto("/homepage");
    }

    function handleSearch() {
        // Obtener el valor del input de búsqueda
        searchQuery = document.getElementById("search-bar").value;

        // Guardar la búsqueda en localStorage
        localStorage.setItem("currentSearchQuery", searchQuery);

        // Evitar realizar búsqueda si la consulta está vacía
        if (searchQuery === "") {
            return;
        }

        // Redirigir a la página de resultados
        const newUrl = `/searchResult/${searchQuery}`;
        goto(newUrl);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }
</script>

<header>
    <button class="logo" onclick={handleGoHome}>Bortify</button>
    <div class="search">
        <div class="search-input">
            <input
                type="text"
                name="search-bar"
                id="search-bar"
                placeholder="Search"
                value={currentSearchQuery}
                onkeydown={handleKeyDown}
            />
            <div class="bottom-border"></div>
        </div>
        <button onclick={handleSearch}>
            <img src="/images/magnifying_glass.png" alt="Magnifying glass" />
        </button>
    </div>
    <button class="logout" onclick={handleLogout}>Log out</button>
</header>
