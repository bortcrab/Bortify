import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
    // Deletes the token from the cookies
    cookies.delete('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });

    return json({ success: true });
}