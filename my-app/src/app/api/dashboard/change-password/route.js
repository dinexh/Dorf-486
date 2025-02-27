import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { oldPassword, newPassword } = await req.json();
        const cookieStore = cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (!accessToken) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Verify the access token
        let decodedToken;
        try {
            decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        // Verify old password and update to new password
        const [rows] = await mysql.execute(
            'SELECT * FROM User WHERE id = ? AND password = ?',
            [decodedToken.userId, oldPassword]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 400 }
            );
        }

        // Update the password
        await mysql.execute(
            'UPDATE User SET password = ? WHERE id = ?',
            [newPassword, decodedToken.userId]
        );

        return NextResponse.json({
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error('Password change error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 