export async function load({ cookies }) {
    const accessToken = cookies.get('access_token');

    if (!accessToken) {
        return { loggedIn: false };
    }

    try {
        // Get user info
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!userResponse.ok) {
            return { loggedIn: false };
        }

        const user = await userResponse.json();

        // Get user playlists
        const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!playlistsResponse.ok) {
            return { loggedIn: true, user, playlists: [] };
        }

        const playlistsData = await playlistsResponse.json();

        return {
            loggedIn: true,
            user,
            playlists: playlistsData.items
        };
    } catch (error) {
        return { loggedIn: false };
    }
}