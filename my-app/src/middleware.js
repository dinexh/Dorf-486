import { NextResponse } from 'next/server';

export async function middleware(request) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define public paths that don't need authentication
    const isPublicPath = path === '/auth/login' || path === '/auth/forgot-password';

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    // If the path is public and user is logged in, redirect to dashboard
    if (isPublicPath && token) {
        try {
            const userRole = request.cookies.get('userRole')?.value;
            if (userRole === 'superadmin') {
                return NextResponse.redirect(new URL('/dashboard/superadmin', request.url));
            } else if (userRole === 'admin') {
                return NextResponse.redirect(new URL('/dashboard/admin', request.url));
            }
        } catch (error) {
            // If there's an error, continue to the public path
            return NextResponse.next();
        }
    }

    // If the path is protected and user is not logged in
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Role-based access control for dashboard routes
    if (path.startsWith('/dashboard/')) {
        try {
            const userRole = request.cookies.get('userRole')?.value;

            // Protect superadmin routes
            if (path.startsWith('/dashboard/superadmin') && userRole !== 'superadmin') {
                if (userRole === 'admin') {
                    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
                }
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }

            // Protect admin routes
            if (path.startsWith('/dashboard/admin') && !userRole) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }

        } catch (error) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/login',
        '/auth/forgot-password'
    ]
}; 