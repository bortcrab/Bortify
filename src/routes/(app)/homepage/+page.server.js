import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // Tries to obtain the access token from the cookies
    const accessToken = cookies.get('access_token');

    if (!accessToken) {
        // If not token is found, redirect to the login
        throw redirect(303, '/login');
    }

    // Otherwise, continue
    try {
        // Get user info
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!userResponse.ok) {
            throw redirect(303, '/login');
        }

        const user = await userResponse.json();

        // Get user playlists
        const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!playlistsResponse.ok) {
            return {user, playlists: [] };
        }

        const playlistsData = await playlistsResponse.json();

        return {
            user,
            playlists: playlistsData.items
        };
    } catch (error) {
        throw redirect(303, '/login');
    }
}