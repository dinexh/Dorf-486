import { NextResponse } from "next/server";
import pool from '@/lib/db';

// GET all admins
export async function GET(request) {
    let connection;
    try {
        connection = await pool.getConnection();
        
        // First, let's check the table structure
        const [columns] = await connection.execute(
            'SHOW COLUMNS FROM User WHERE Field = "status"'
        );
        
        // Query to get all admins and superadmins
        const [admins] = await connection.execute(
            'SELECT id, name, idNumber, email, role, status FROM User ORDER BY role DESC'
        );

        return NextResponse.json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json(
            { error: "Failed to fetch admins" },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}

// PUT to update admin
export async function PUT(request) {
    let connection;
    try {
        const { id, name, idNumber, email, role, status } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Admin ID is required" },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();

        // First, let's check the table structure
        const [columns] = await connection.execute(
            'SHOW COLUMNS FROM User WHERE Field = "status"'
        );

        // First check if the admin exists and get current data
        const [existingAdmin] = await connection.execute(
            'SELECT * FROM User WHERE id = ?',
            [id]
        );

        if (!existingAdmin || existingAdmin.length === 0) {
            return NextResponse.json(
                { error: "Admin not found" },
                { status: 404 }
            );
        }

        // Update admin details
        const result = await connection.execute(
            'UPDATE User SET name = ?, idNumber = ?, email = ?, role = ?, status = ? WHERE id = ?',
            [
                name || existingAdmin[0].name,
                idNumber || existingAdmin[0].idNumber,
                email || existingAdmin[0].email,
                role || existingAdmin[0].role,
                status,  // Using the original status value for now
                id
            ]
        );

        if (result[0].affectedRows === 0) {
            throw new Error('No rows were updated');
        }

        return NextResponse.json({ 
            message: `Admin status updated successfully`,
            status: status
        });
    } catch (error) {
        console.error('Error updating admin:', error);
        return NextResponse.json(
            { error: "Failed to update admin: " + error.message },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}

// DELETE admin
export async function DELETE(request) {
    let connection;
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Admin ID is required" },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();

        // First check if admin exists
        const [admin] = await connection.execute(
            'SELECT id FROM User WHERE id = ?',
            [id]
        );

        if (!admin || admin.length === 0) {
            return NextResponse.json(
                { error: "Admin not found" },
                { status: 404 }
            );
        }

        // Delete the admin
        const result = await connection.execute(
            'DELETE FROM User WHERE id = ?',
            [id]
        );

        if (result[0].affectedRows === 0) {
            throw new Error('No rows were deleted');
        }

        return NextResponse.json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error('Error deleting admin:', error);
        return NextResponse.json(
            { error: "Failed to delete admin: " + error.message },
            { status: 500 }
        );
    } finally {
        if (connection) connection.release();
    }
}

