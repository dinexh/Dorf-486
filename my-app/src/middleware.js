import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    console.log('Current path:', path);

    // Define public paths
    const isPublicPath = path === '/auth/login' || 
                        path === '/auth/forgot-password';

    const token = request.cookies.get('token')?.value;
    console.log('Token exists:', !!token);

    try {
        // If token exists, verify it
        if (token) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            console.log('Token verified, role:', payload.role);

            // If on public path and token is valid, redirect to dashboard
            if (isPublicPath) {
                return NextResponse.redirect(
                    new URL(
                        payload.role === 'superadmin' 
                            ? '/dashboard/superadmin' 
                            : '/dashboard/admin',
                        request.url
                    )
                );
            }

            // For dashboard paths, check role access
            if (path.startsWith('/dashboard/')) {
                if (path.startsWith('/dashboard/superadmin') && payload.role !== 'superadmin') {
                    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
                }
                // Allow access to dashboard
                return NextResponse.next();
            }
        }

        // No token and trying to access protected route
        if (!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        // Allow access to public paths when no token
        return NextResponse.next();

    } catch (error) {
        console.error('Middleware error:', error);
        // If token verification fails, clear token and redirect to login
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/login',
        '/auth/forgot-password'
    ]
};