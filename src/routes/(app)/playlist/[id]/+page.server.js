import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
    // Tries to obtain the access token from the cookies
    const accessToken = cookies.get('access_token');

    if (!accessToken) {
        // If not token is found, redirect to the login
        throw redirect(303, '/login');
    }

    // Otherwise, continue
    try {
        // Get playlist's songs
        const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${params.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const playlistData = await playlistResponse.json();

        return {
            playlist: playlistData
        };
    } catch (error) {
        throw redirect(303, '/homepage');
    }
}