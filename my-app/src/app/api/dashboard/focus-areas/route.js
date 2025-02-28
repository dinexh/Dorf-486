import pool from '@/lib/db';

export async function GET() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(`
            SELECT f.*, d.name as domainName 
            FROM FocusAreas f 
            JOIN Domain d ON f.domain_id = d.id
        `);
        connection.release();
        return Response.json(rows);
    } catch (error) {
        console.error('Error fetching focus areas:', error);
        return Response.json({ error: 'Failed to fetch focus areas' }, { status: 500 });
    }
}

export async function POST(request) {
    let connection;
    try {
        const data = await request.json();
        
        if (!data.description || !data.imageLink || !data.domain_id) {
            return Response.json(
                { error: 'Description, image link, and domain are required' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'INSERT INTO FocusAreas (description, imageLink, domain_id) VALUES (?, ?, ?)',
            [data.description, data.imageLink, data.domain_id]
        );
        
        return Response.json({
            id: result.insertId,
            ...data
        });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Failed to create focus area' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}
