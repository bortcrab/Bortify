import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
    // Tries to obtain the access token from the cookies
    const accessToken = cookies.get('access_token');

    console.log(params.searchQuery);

    if (!accessToken) {
        // If not token is found, redirect to the login
        throw redirect(303, '/login');
    }

    // Otherwise, continue
    try {
        // Get playlist's songs
        const results = await fetch(`https://api.spotify.com/v1/search?q=${params.searchQuery}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const resultsData = await results.json();

        return {
            songs: resultsData
        };
    } catch (error) {
        throw redirect(303, '/homepage');
    }
}