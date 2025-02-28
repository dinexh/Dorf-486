import pool from '@/lib/db';

export async function GET() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(`
            SELECT g.*, d.name as domainName 
            FROM Gallery g 
            JOIN Domain d ON g.domain_id = d.id
        `);
        connection.release();
        return Response.json(rows);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return Response.json({ error: 'Failed to fetch gallery' }, { status: 500 });
    }
}

export async function POST(request) {
    let connection;
    try {
        const data = await request.json();
        
        if (!data.imageLink || !data.domain_id) {
            return Response.json(
                { error: 'Image link and domain are required' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        
        // Verify domain exists
        const [domains] = await connection.execute(
            'SELECT id FROM Domain WHERE id = ?',
            [data.domain_id]
        );

        if (domains.length === 0) {
            return Response.json(
                { error: 'Invalid domain ID' },
                { status: 400 }
            );
        }

        const [result] = await connection.execute(
            'INSERT INTO Gallery (imageLink, heroImageLink, domain_id) VALUES (?, ?, ?)',
            [data.imageLink, data.heroImageLink || null, data.domain_id]
        );
        
        return Response.json({
            id: result.insertId,
            ...data
        });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Failed to create gallery item' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}
