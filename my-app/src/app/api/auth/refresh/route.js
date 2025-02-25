import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: "No token found" },
                { status: 401 }
            );
        }

        try {
            // Verify the current token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verify the user in the database
            const [rows] = await mysql.execute(
                'SELECT id, idNumber, name, role FROM User WHERE id = ?',
                [decoded.userId]
            );

            if (rows.length === 0) {
                return NextResponse.json(
                    { error: "Invalid token" },
                    { status: 401 }
                );
            }

            const user = rows[0];

            // Generate new JWT token
            const newToken = jwt.sign(
                {
                    userId: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Create response with new token
            const response = NextResponse.json({
                message: "Token refreshed successfully",
                user: {
                    id: user.id,
                    idNumber: user.idNumber,
                    name: user.name,
                    role: user.role
                }
            });

            // Set new cookies with updated JWT
            response.cookies.set('token', newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            response.cookies.set('userRole', user.role, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return response;

        } catch (jwtError) {
            // If token verification fails
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 