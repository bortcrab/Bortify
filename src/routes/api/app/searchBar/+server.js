export async function POST({ request, cookies }) {
    // Tries to obtain the access token from the cookies
    const accessToken = cookies.get('access_token');

    if (!accessToken) {
        // If not token is found, redirect the user to the login
        throw redirect(303, '/login');
    }

    // Get the URL for the next batch of songs from the request body
    const { nextUrl } = await request.json();

    try {
        // Obtain the next batch of songs from the API
        const playlistResponse = await fetch(nextUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!playlistResponse.ok) {
            console.log("Failed to fetch songs from API:", playlistResponse.status);
            return new Response(
                JSON.stringify({ message: 'Failed to fetch songs' }),
                { status: playlistResponse.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const playlistData = await playlistResponse.json();

        return new Response(
            JSON.stringify({ items: playlistData.items, next: playlistData.next }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error("Error fetching songs:", error);
        return new Response(
            JSON.stringify({ message: 'Error fetching songs', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
