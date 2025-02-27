import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
    let connection;
    try {
        const { id } = params;
        
        connection = await pool.getConnection();
        const query = 'DELETE FROM News WHERE id = ?';
        
        const [result] = await connection.execute(query, [id]);
        
        if (result.affectedRows === 0) {
            return NextResponse.json({ 
                error: 'News article not found' 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            message: 'News article deleted successfully' 
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting news article:', error);
        return NextResponse.json({ 
            error: 'Failed to delete news article',
            details: error.message 
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
