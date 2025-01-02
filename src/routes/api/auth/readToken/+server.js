export async function GET({ cookies }) {
    
    const accessToken = cookies.get('access_token');

    return new Response(JSON.stringify({ token: accessToken }), {
        headers: { 'Content-Type': 'application/json' },
    });
}