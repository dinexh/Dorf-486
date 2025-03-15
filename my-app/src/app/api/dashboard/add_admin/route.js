import { NextResponse } from "next/server";
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    let connection;
    try {
        const { name, idNumber, email, password, role = 'admin' } = await request.json();

        // Validate required fields
        if (!name || !idNumber || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();

        // Check if email already exists
        const [existingUser] = await connection.execute(
            'SELECT id FROM User WHERE email = ?',
            [email]
        );

        if (existingUser && existingUser.length > 0) {
            return NextResponse.json(
                { error: "An admin with this email already exists" },
                { status: 400 }
            );
        }

        // Check if ID number already exists
        const [existingIdNumber] = await connection.execute(
            'SELECT id FROM User WHERE idNumber = ?',
            [idNumber]
        );

        if (existingIdNumber && existingIdNumber.length > 0) {
            return NextResponse.json(
                { error: "An admin with this ID Number already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin
        const result = await connection.execute(
            'INSERT INTO User (name, idNumber, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, idNumber, email, hashedPassword, role, 'active']
        );

        return NextResponse.json({ 
            message: "Admin added successfully",
            id: result[0].insertId
        });
    } catch (error) {
        console.error('Error adding admin:', error);
        return NextResponse.json(
            { error: "Failed to add admin: " + error.message },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}