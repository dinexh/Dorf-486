import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    let connection;
    try {
        const body = await request.json();
        const { image_link, description, award_date } = body;
        
        connection = await pool.getConnection();
        
        await connection.query(
            'INSERT INTO awards (image_link, description, award_date) VALUES (?, ?, ?)',
            [image_link, description, award_date]
        );

        return NextResponse.json({ message: 'Award added successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}

export async function GET() {
    let connection;
    try {
        connection = await pool.getConnection();
        
        const [awards] = await connection.query(
            'SELECT * FROM awards ORDER BY award_date DESC'
        );

        return NextResponse.json({ awards }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}

export async function DELETE(request) {
    let connection;
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        connection = await pool.getConnection();
        await connection.query('DELETE FROM awards WHERE id = ?', [id]);
        
        return NextResponse.json({ message: 'Award deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}

export async function PUT(request) {
    let connection;
    try {
        const body = await request.json();
        const { id, image_link, description, award_date } = body;
        
        connection = await pool.getConnection();
        await connection.query(
            'UPDATE awards SET image_link = ?, description = ?, award_date = ? WHERE id = ?',
            [image_link, description, award_date, id]
        );
        
        return NextResponse.json({ message: 'Award updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}