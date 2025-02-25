import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST() {
    try {
        const cookieStore = cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { error: "No refresh token found" },
                { status: 401 }
            );
        }

        try {
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

            // Check if it's actually a refresh token
            if (decoded.type !== 'refresh') {
                throw new Error('Invalid token type');
            }

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

            // Generate new access token
            const newAccessToken = jwt.sign(
                {
                    userId: user.id,
                    role: user.role,
                    type: 'access'
                },
                process.env.JWT_SECRET,
                { expiresIn: '30m' }
            );

            // Generate new refresh token
            const newRefreshToken = jwt.sign(
                {
                    userId: user.id,
                    role: user.role,
                    type: 'refresh'
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Create response
            const response = NextResponse.json({
                message: "Token refreshed successfully",
                user: {
                    id: user.id,
                    idNumber: user.idNumber,
                    name: user.name,
                    role: user.role
                }
            });

            // Set new cookies
            response.cookies.set('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 60 // 30 minutes
            });

            response.cookies.set('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 // 7 days
            });

            return response;

        } catch (jwtError) {
            console.error('JWT verification failed:', jwtError);
            // If token verification fails, clear both tokens
            const response = NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            return response;
        }

    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 