import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Function to verify JWT token
async function verifyToken(token) {
    if (!token) return null;
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

    // Get both tokens from cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // For protected routes
    if (!isPublicPath) {
        // First try the access token
        const accessPayload = await verifyToken(accessToken);
        
        if (!accessPayload) {
            // If access token is invalid, try refresh token
            const refreshPayload = await verifyToken(refreshToken);
            
            if (!refreshPayload) {
                // If both tokens are invalid, redirect to login
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }
            
            // If refresh token is valid but access token isn't, redirect to refresh endpoint
            if (path !== '/api/auth/refresh') {
                return NextResponse.redirect(new URL('/api/auth/refresh', request.url));
            }
        }
    }

    // If the path is public and user is logged in, redirect to dashboard
    if (isPublicPath && accessToken && path !== '/api/auth/refresh') {
        try {
            const payload = await verifyToken(accessToken);
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
            const payload = await verifyToken(accessToken);
            if (!payload) {
                // Try refresh token if access token is invalid
                const refreshPayload = await verifyToken(refreshToken);
                if (!refreshPayload) {
                    return NextResponse.redirect(new URL('/auth/login', request.url));
                }
                // Redirect to refresh endpoint to get new access token
                return NextResponse.redirect(new URL('/api/auth/refresh', request.url));
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