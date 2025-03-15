import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(req) {
    let connection;
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: "Token and password are required" },
                { status: 400 }
            );
        }

        // Verify token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (decodedToken.type !== 'reset') {
                throw new Error('Invalid token type');
            }
        } catch (error) {
            return NextResponse.json(
                { error: "Invalid or expired reset token" },
                { status: 401 }
            );
        }

        connection = await mysql.getConnection();

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        await connection.execute(
            'UPDATE User SET password = ? WHERE id = ?',
            [hashedPassword, decodedToken.userId]
        );

        return NextResponse.json({
            message: "Password reset successful"
        });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}