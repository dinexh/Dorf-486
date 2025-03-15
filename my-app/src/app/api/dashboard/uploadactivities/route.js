import pool from '@/lib/db';

export async function POST(request) {
    let connection;
    try {
        // Parse the incoming request body
        const body = await request.json();
        
        // Validate input
        if (!body.name || !body.date || !body.domain_id || !body.studentsParticipated || !body.reportLink) {
            return Response.json({ 
                success: false,
                error: 'All fields are required' 
            }, { status: 400 });
        }

        connection = await pool.getConnection();
        
        // Format date for MySQL
        const formattedDate = new Date(body.date).toISOString().slice(0, 19).replace('T', ' ');

        const [result] = await connection.execute(
            'INSERT INTO Activity (name, date, domain_id, studentsParticipated, reportLink) VALUES (?, ?, ?, ?, ?)',
            [
                body.name,
                formattedDate,
                parseInt(body.domain_id),
                parseInt(body.studentsParticipated),
                body.reportLink
            ]
        );

        return Response.json({ 
            success: true,
            message: 'Activity added successfully',
            data: {
                id: result.insertId,
                ...body,
                date: formattedDate
            }
        });

    } catch (error) {
        console.error('Error creating activity:', error);
        return Response.json({ 
            success: false,
            error: 'Failed to create activity',
            details: error.message 
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}