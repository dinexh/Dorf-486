import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET: Fetch all gallery images
export async function GET() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM Gallery ORDER BY id DESC');
        connection.release();
        
        return NextResponse.json({ images: rows }, { status: 200 });
    } catch (error) {
        console.error('Error fetching gallery images:', error);
        return NextResponse.json(
            { error: 'Failed to fetch gallery images' },
            { status: 500 }
        );
    }
}

// POST: Add a new gallery image
export async function POST(request) {
    try {
        const { imageLink, domain_id } = await request.json();

        if (!imageLink || !domain_id) {
            return NextResponse.json(
                { error: 'Image link and domain ID are required' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();
        await connection.execute(
            'INSERT INTO Gallery (imageLink, domain_id) VALUES (?, ?)',
            [imageLink, domain_id]
        );
        connection.release();

        return NextResponse.json(
            { message: 'Gallery image added successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding gallery image:', error);
        return NextResponse.json(
            { error: 'Failed to add gallery image' },
            { status: 500 }
        );
    }
}

// DELETE: Remove a gallery image
export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Image ID is required' },
                { status: 400 }
            );
        }

        const connection = await pool.getConnection();
        await connection.execute('DELETE FROM Gallery WHERE id = ?', [id]);
        connection.release();

        return NextResponse.json(
            { message: 'Gallery image deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        return NextResponse.json(
            { error: 'Failed to delete gallery image' },
            { status: 500 }
        );
    }
} 