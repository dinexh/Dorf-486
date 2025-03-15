import pool from '@/lib/db';

export async function PUT(request) {
    let connection;
    try {
        const body = await request.json();
        const { id, name, date, domain_id, studentsParticipated, reportLink } = body;

        if (!id || !name || !date || !domain_id || !studentsParticipated || !reportLink) {
            return Response.json({ 
                success: false,
                error: 'All fields are required' 
            }, { status: 400 });
        }

        connection = await pool.getConnection();
        
        const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

        const [result] = await connection.execute(
            'UPDATE Activity SET name = ?, date = ?, domain_id = ?, studentsParticipated = ?, reportLink = ? WHERE id = ?',
            [name, formattedDate, parseInt(domain_id), parseInt(studentsParticipated), reportLink, id]
        );

        if (result.affectedRows === 0) {
            return Response.json({ 
                success: false,
                error: 'Activity not found' 
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: 'Activity updated successfully',
            data: {
                id,
                name,
                date: formattedDate,
                domain_id,
                studentsParticipated,
                reportLink
            }
        });

    } catch (error) {
        console.error('Error updating activity:', error);
        return Response.json({ 
            success: false,
            error: 'Failed to update activity',
            details: error.message 
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}