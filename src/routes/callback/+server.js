import { json, redirect } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
    const code = url.searchParams.get('code');
    if (!code) {
        return json({ error: 'Authorization code is missing.' }, { status: 400 });
    }

    const client_id = import.meta.env.VITE_CLIENT_ID;
    const client_secret = import.meta.env.VITE_CLIENT_SECRET;
    const redirect_uri = 'http://localhost:5173/callback';
    //const redirect_uri = 'https://humble-space-meme-x4jjq9j6qqrfv54q-5173.app.github.dev/callback';
    const token_url = 'https://accounts.spotify.com/api/token';

    const response = await fetch(token_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
        body: new URLSearchParams({
            code,
            redirect_uri,
            grant_type: 'authorization_code',
        }),
    });

    const data = await response.json();

    if (data.error) {
        return json({ error: data.error_description }, { status: 400 });
    }

    // Stores token in a cookie
    const { access_token, refresh_token, expires_in } = data;
    cookies.set('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',  // The cookie will be available for all routes
        maxAge: data.expires_in
    });

    // Redirect user to homepage
    throw redirect(303, '/homepage');
}
