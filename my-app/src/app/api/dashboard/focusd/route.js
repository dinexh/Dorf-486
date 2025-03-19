import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET route to fetch all focus areas with domain names
export async function GET() {
    try {
        const connection = await pool.getConnection();
        
        const [rows] = await connection.execute(`
            SELECT FocusAreas.id, Domain.name as domain_name, FocusAreas.description, FocusAreas.imageLink 
            FROM FocusAreas 
            JOIN Domain ON FocusAreas.domain_id = Domain.id 
            ORDER BY FocusAreas.id ASC`
        );
        
        connection.release();
        
        return NextResponse.json(
            { message: 'Focus areas fetched successfully', data: rows },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching focus areas:', error);
        return NextResponse.json(
            { message: 'Error fetching focus areas', error: error.message },
            { status: 500 }
        );
    }
}

// POST route to add a new focus area
export async function POST(request) {
    try {
        const body = await request.json();
        const { domain_id, description, imageLink } = body;

        if (!domain_id || !description || !imageLink) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();

        const [result] = await connection.execute(
            'INSERT INTO FocusAreas (domain_id, description, imageLink) VALUES (?, ?, ?)',
            [domain_id, description, imageLink]
        );
        
        connection.release();

        return NextResponse.json(
            { 
                message: 'Focus area added successfully',
                data: { 
                    id: result.insertId, 
                    domain_id,
                    description,
                    imageLink
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding focus area:', error);
        return NextResponse.json(
            { message: 'Error adding focus area', error: error.message },
            { status: 500 }
        );
    }
}

// DELETE route
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { message: 'ID is required' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'DELETE FROM FocusAreas WHERE id = ?',
            [id]
        );
        
        connection.release();

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { message: 'Focus area not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Focus area deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting focus area:', error);
        return NextResponse.json(
            { message: 'Error deleting focus area', error: error.message },
            { status: 500 }
        );
    }
}

// Additional route to get all domains for the dropdown
export async function GET_DOMAINS() {
    try {
        const connection = await pool.getConnection();
        
        const [rows] = await connection.execute(
            'SELECT id, name FROM Domain ORDER BY id ASC'
        );
        
        connection.release();
        
        return NextResponse.json(
            { message: 'Domains fetched successfully', data: rows },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching domains:', error);
        return NextResponse.json(
            { message: 'Error fetching domains', error: error.message },
            { status: 500 }
        );
    }
}

// Add this PUT route alongside your existing routes

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, domain_id, description, imageLink } = body;

        if (!id || !domain_id || !description || !imageLink) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'UPDATE FocusAreas SET domain_id = ?, description = ?, imageLink = ? WHERE id = ?',
            [domain_id, description, imageLink, id]
        );
        
        connection.release();

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { message: 'Focus area not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Focus area updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating focus area:', error);
        return NextResponse.json(
            { message: 'Error updating focus area', error: error.message },
            { status: 500 }
        );
    }
} 