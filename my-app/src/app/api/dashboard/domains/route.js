import pool from '@/lib/db';

export async function GET() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM Domain');
        connection.release();
        return Response.json(rows);
    } catch (error) {
        console.error('Error fetching domains:', error);
        return Response.json(
            { error: 'Failed to fetch domains' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    let connection;
    try {
        const data = await request.json();
        
        // Validate input
        if (!data.name) {
            return Response.json(
                { error: 'Domain name is required' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'INSERT INTO Domain (name) VALUES (?)',
            [data.name]
        );
        
        const newDomain = {
            id: result.insertId,
            name: data.name
        };
        
        return Response.json(newDomain);
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        
        return Response.json(
            { 
                error: 'Failed to create domain',
                details: error.message
            },
            { status: 500 }
        );
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
