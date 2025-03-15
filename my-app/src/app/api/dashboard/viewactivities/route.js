import pool from '@/lib/db';

export async function GET() {
    let connection;
    try {
        connection = await pool.getConnection();
        
        const [rows] = await connection.execute(`
            SELECT 
                Activity.id,
                Activity.name,
                Activity.date,
                Activity.studentsParticipated,
                Activity.reportLink,
                Domain.name as domain,
                Domain.id as domain_id
            FROM Activity 
            JOIN Domain ON Activity.domain_id = Domain.id
            ORDER BY Activity.date DESC
        `);

        return Response.json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error('Error fetching activities:', error);
        return Response.json({ 
            success: false,
            error: 'Failed to fetch activities' 
        }, { status: 500 });
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
            return Response.json({ 
                success: false,
                error: 'Activity ID is required' 
            }, { status: 400 });
        }

        connection = await pool.getConnection();
        
        const [result] = await connection.execute(
            'DELETE FROM Activity WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return Response.json({ 
                success: false,
                error: 'Activity not found' 
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: 'Activity deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting activity:', error);
        return Response.json({ 
            success: false,
            error: 'Failed to delete activity' 
        }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}