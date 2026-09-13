// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    const adminCookie = req.cookies.get('admin_session');

    // Protect all /admin routes except the login route
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        if (!adminCookie || adminCookie.value !== process.env.AUTH_SECRET) {
            const loginUrl = new URL('/admin/login', req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect authenticated users away from login page to dashboard
    if (pathname === '/admin/login') {
        if (adminCookie && adminCookie.value === process.env.AUTH_SECRET) {
            const dashboardUrl = new URL('/admin', req.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};