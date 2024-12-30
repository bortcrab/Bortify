import { json } from '@sveltejs/kit';

export async function GET() {
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = 'http://localhost:5173/callback';
    const scope = 'user-read-private playlist-read-private';

    // Generates auth URL
    const auth_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}`;
    
    // Returns auth URL to the frontend
    return json({ auth_url });
}
