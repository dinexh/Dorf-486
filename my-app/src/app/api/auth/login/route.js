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
        
        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
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
        
        // Set cookies with JWT token
        response.cookies.set('token', token, {
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

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
