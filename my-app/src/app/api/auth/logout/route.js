import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookieStore = cookies();
        
        // Clear authentication cookies
        cookieStore.delete('token');
        cookieStore.delete('userRole');

        return NextResponse.json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 