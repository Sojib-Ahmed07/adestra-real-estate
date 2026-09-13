// app/api/admin/login/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { password } = await req.json();

        if (password === process.env.ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true });

            // Store auth state in an encrypted/signed HTTP-Only cookie
            response.cookies.set('admin_session', process.env.AUTH_SECRET, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days duration
            });

            return response;
        }

        return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}