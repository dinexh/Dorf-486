import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logged out successfully"
        });

        // Clear the token cookie
        response.cookies.delete('token');

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Logout failed" },
            { status: 500 }
        );
    }
} 