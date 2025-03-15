import pool from '@/lib/db';

export async function PUT(request) {
    let connection;
    try {
        const body = await request.json();
        const { id, name, date, domain_id, studentsParticipated, reportLink } = body;

        connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'UPDATE Activity SET name = ?, date = ?, domain_id = ?, studentsParticipated = ?, reportLink = ? WHERE id = ?',
            [name, date, domain_id, studentsParticipated, reportLink, id]
        );

        if (result.affectedRows === 0) {
            return Response.json({ 
                success: false,
                error: 'Activity not found' 
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: 'Activity updated successfully'
        });

    } catch (error) {
        console.error('Error updating activity:', error);
        return Response.json({ 
            success: false,
            error: 'Failed to update activity' 
        }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}