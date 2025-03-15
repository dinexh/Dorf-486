import { NextResponse } from "next/server";
import mysql from "@/lib/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(req) {
    let connection;
    try {
        const { idNumber, password } = await req.json();

        // Input validation
        if (!idNumber || !password) {
            return NextResponse.json(
                { error: "ID number and password are required" },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();

        // Query the database
        const [rows] = await connection.execute(
            'SELECT * FROM User WHERE idNumber = ?',
            [idNumber]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate single token with 1 hour expiry
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const response = NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                idNumber: user.idNumber,
                name: user.name,
                role: user.role
            }
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 // 1 hour in seconds
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}