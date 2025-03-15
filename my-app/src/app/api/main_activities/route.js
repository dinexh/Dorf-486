import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        a.id,
        DATE_FORMAT(a.date, '%d-%m-%Y') as "Date of the activity \nDD-MM-YYYY",
        a.name as "Name of the activity",
        d.name as "Domain",
        a.studentsParticipated as "Number of students participated in such activities",
        a.reportLink as "Web Links",
        CONCAT(
          YEAR(a.date),
          '-',
          YEAR(a.date) + 1
        ) as "Year"
      FROM Activity a
      LEFT JOIN Domain d ON a.domain_id = d.id
      ORDER BY a.date DESC
    `);

    connection.release();
    
    return NextResponse.json({ 
      activities: rows,
      success: true 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch activities', 
        details: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
}