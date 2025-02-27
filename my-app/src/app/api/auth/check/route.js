import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import mysql from "@/lib/db";
import jwt from 'jsonwebtoken';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken');
        const refreshToken = cookieStore.get('refreshToken');
        
        console.log('Auth Check - AccessToken:', accessToken?.value);
        console.log('Auth Check - RefreshToken:', refreshToken?.value);
        
        if (!accessToken && !refreshToken) {
            console.log('Auth Check - Missing cookies');
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Use the access token if available, otherwise use refresh token
        const tokenToUse = accessToken || refreshToken;

        // Verify the token and get the payload
        let decodedToken;
        try {
            decodedToken = jwt.verify(tokenToUse.value, process.env.JWT_SECRET);
        } catch (error) {
            console.log('Auth Check - Invalid token:', error.message);
            const response = NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            return response;
        }

        // Query the database to get user information using the userId from token
        const [rows] = await mysql.execute(
            'SELECT id, idNumber, name, role , email FROM User WHERE id = ?',
            [decodedToken.userId]  // Use userId from the decoded token
        );

        console.log('Auth Check - DB Result:', rows[0]);

        if (rows.length === 0) {
            console.log('Auth Check - User not found in DB');
            // Create response with cookie clearing
            const response = NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            );
            
            // Clear cookies
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            
            return response;
        }

        const user = rows[0];

        // Verify role matches
        if (user.role !== decodedToken.role) {
            console.log('Auth Check - Role mismatch:', user.role, decodedToken.role);
            const response = NextResponse.json(
                { error: "Invalid role" },
                { status: 401 }
            );
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            return response;
        }

        return NextResponse.json({
            user: {
                id: user.id,
                idNumber: user.idNumber,
                name: user.name,
                role: user.role,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 