import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Function to verify JWT token
async function verifyToken(token) {
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_SECRET)
        );
        return payload;
    } catch (error) {
        return null;
    }
}

export async function middleware(request) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Define public paths that don't need authentication
    const isPublicPath = path === '/auth/login' || 
                        path === '/auth/forgot-password' ||
                        path === '/api/auth/refresh';

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    // For protected routes, verify the JWT token
    if (!isPublicPath) {
        const payload = await verifyToken(token);
        if (!payload) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    // If the path is public and user is logged in, redirect to dashboard
    if (isPublicPath && token && path !== '/api/auth/refresh') {
        try {
            const payload = await verifyToken(token);
            if (payload) {
                if (payload.role === 'superadmin') {
                    return NextResponse.redirect(new URL('/dashboard/superadmin', request.url));
                } else if (payload.role === 'admin') {
                    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
                }
            }
        } catch (error) {
            // If there's an error, continue to the public path
            return NextResponse.next();
        }
    }

    // Role-based access control for dashboard routes
    if (path.startsWith('/dashboard/')) {
        try {
            const payload = await verifyToken(token);
            if (!payload) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }

            // Protect superadmin routes
            if (path.startsWith('/dashboard/superadmin') && payload.role !== 'superadmin') {
                if (payload.role === 'admin') {
                    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
                }
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }

            // Protect admin routes
            if (path.startsWith('/dashboard/admin') && !payload.role) {
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
        '/auth/forgot-password',
        '/api/auth/refresh'
    ]
}; 