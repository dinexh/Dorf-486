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

export async function PUT(request) {
    let connection;
    try {
        const data = await request.json();
        
        if (!data.id || !data.name) {
            return Response.json(
                { error: 'Domain ID and name are required' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'UPDATE Domain SET name = ? WHERE id = ?',
            [data.name, data.id]
        );
        
        if (result.affectedRows === 0) {
            return Response.json(
                { error: 'Domain not found' },
                { status: 404 }
            );
        }
        
        return Response.json({
            id: data.id,
            name: data.name
        });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Failed to update domain' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}

export async function DELETE(request) {
    let connection;
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json(
                { error: 'Domain ID is required' },
                { status: 400 }
            );
        }

        connection = await pool.getConnection();
        
        // Check if domain is in use
        const [references] = await connection.execute(`
            SELECT 
                (SELECT COUNT(*) FROM Activity WHERE domain_id = ?) as activities,
                (SELECT COUNT(*) FROM Gallery WHERE domain_id = ?) as gallery,
                (SELECT COUNT(*) FROM AreasOfWork WHERE domain_id = ?) as areas,
                (SELECT COUNT(*) FROM FocusAreas WHERE domain_id = ?) as focus
        `, [id, id, id, id]);

        const total = Object.values(references[0]).reduce((a, b) => a + b, 0);
        if (total > 0) {
            return Response.json(
                { error: 'Cannot delete domain that is in use' },
                { status: 400 }
            );
        }

        const [result] = await connection.execute(
            'DELETE FROM Domain WHERE id = ?',
            [id]
        );
        
        if (result.affectedRows === 0) {
            return Response.json(
                { error: 'Domain not found' },
                { status: 404 }
            );
        }
        
        return Response.json({ message: 'Domain deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Failed to delete domain' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}
