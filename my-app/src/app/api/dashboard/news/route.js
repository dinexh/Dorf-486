import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    let connection;
    try {
        const { title, description, date, imageUrl } = await request.json();
        
        // Input validation
        if (!title || !description || !date || !imageUrl) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        
        const query = `
            INSERT INTO News (title, description, date, articleLink)
            VALUES (?, ?, ?, ?)
        `;
        const values = [title, description, new Date(date), imageUrl];

        const [result] = await connection.execute(query, values);

        return NextResponse.json({
            message: 'News article created successfully',
            id: result.insertId
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating news article:', error);
        return NextResponse.json({ 
            error: 'Failed to create news article',
            details: error.message 
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export async function GET() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(`
            SELECT * FROM News 
            ORDER BY date DESC
        `);
        
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch news',
            details: error.message 
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
