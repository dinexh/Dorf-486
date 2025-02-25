import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const { idNumber, password } = await req.json();

        // Input validation
        if (!idNumber || !password) {
            return NextResponse.json(
                { error: "ID number and password are required" },
                { status: 400 }
            );
        }

        // Query the database
        const [rows] = await mysql.execute(
            'SELECT * FROM User WHERE idNumber = ? AND password = ?',
            [idNumber, password]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Successfully authenticated
        const user = rows[0];
        
        // Generate access token (short-lived)
        const accessToken = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                type: 'access'
            },
            process.env.JWT_SECRET,
            { expiresIn: '30m' } // 30 minutes
        );

        // Generate refresh token (long-lived)
        const refreshToken = jwt.sign(
            {
                userId: user.id,
                role: user.role,
                type: 'refresh'
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // 7 days
        );

        // Create response
        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                idNumber: user.idNumber,
                name: user.name,
                role: user.role
            }
        });
        
        // Set cookies
        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 60 // 30 minutes
        });
        
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
