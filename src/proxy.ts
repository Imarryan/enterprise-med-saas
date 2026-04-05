import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    const { nextUrl, auth: session } = req;
    const isLoggedIn = !!session;
    const userRole = (session?.user as { role?: string } | undefined)?.role;

    const isAdminRoute = nextUrl.pathname.startsWith('/admin');
    const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
    const isAuthRoute = nextUrl.pathname.startsWith('/auth');
    const isAdminApi = nextUrl.pathname.startsWith('/api/admin');

    // Redirect logged-in users away from auth pages
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }

    // Protect dashboard routes
    if (isDashboardRoute && !isLoggedIn) {
        return NextResponse.redirect(
            new URL(`/auth/login?callbackUrl=${nextUrl.pathname}`, nextUrl)
        );
    }

    // Protect admin pages
    if (isAdminRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(
                new URL(`/auth/login?callbackUrl=${nextUrl.pathname}`, nextUrl)
            );
        }
        if (userRole !== 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard', nextUrl));
        }
    }

    // Protect admin API routes
    if (isAdminApi) {
        if (!isLoggedIn || userRole !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*', '/api/admin/:path*'],
};

