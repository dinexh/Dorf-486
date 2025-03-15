import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import mysql from "@/lib/db";
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        
        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify the token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token.value, process.env.JWT_SECRET);
        } catch (error) {
            const response = NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
            response.cookies.delete('token');
            return response;
        }

        // Get user info
        const [rows] = await mysql.execute(
            'SELECT id, idNumber, name, role, email FROM User WHERE id = ?',
            [decodedToken.userId]
        );

        return NextResponse.json({ user: rows[0] });

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 