import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // Create response object
        const response = NextResponse.json({
            message: "Logged out successfully"
        });
        
        // Clear authentication cookies
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 