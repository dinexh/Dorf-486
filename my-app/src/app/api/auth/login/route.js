import { NextResponse } from "next/server";
import mysql from "@/lib/db";

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
        return NextResponse.json({
            message: "Login successful",
            user: {
                id: user.id,
                idNumber: user.id_number,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
