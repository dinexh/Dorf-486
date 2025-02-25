import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import mysql from "@/lib/db";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const userRole = cookieStore.get('userRole');
        
        console.log('Auth Check - Token:', token?.value);
        console.log('Auth Check - UserRole:', userRole?.value);
        
        if (!token || !userRole) {
            console.log('Auth Check - Missing cookies');
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Query the database to get user information
        const [rows] = await mysql.execute(
            'SELECT id, idNumber, name, role FROM User WHERE id = ?',
            [token.value]
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
            response.cookies.delete('token');
            response.cookies.delete('userRole');
            
            return response;
        }

        const user = rows[0];

        // Verify role matches
        if (user.role !== userRole.value) {
            console.log('Auth Check - Role mismatch:', user.role, userRole.value);
            const response = NextResponse.json(
                { error: "Invalid role" },
                { status: 401 }
            );
            
            // Clear cookies
            response.cookies.delete('token');
            response.cookies.delete('userRole');
            
            return response;
        }

        return NextResponse.json({
            user: {
                id: user.id,
                idNumber: user.idNumber,
                name: user.name,
                role: user.role
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