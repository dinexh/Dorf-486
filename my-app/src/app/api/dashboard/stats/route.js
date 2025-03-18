import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Get overall statistics
    const [overallStats] = await db.query(`
      SELECT 
        COUNT(DISTINCT a.id) as totalActivities,
        SUM(a.studentsParticipated) as totalStudents,
        COUNT(DISTINCT d.id) as totalDomains
      FROM Activity a
      JOIN Domain d ON a.domain_id = d.id
    `);

    // Get domain-wise statistics
    const [domainStats] = await db.query(`
      SELECT 
        d.name as domainName,
        COUNT(a.id) as activityCount,
        SUM(a.studentsParticipated) as studentCount
      FROM Domain d
      LEFT JOIN Activity a ON d.id = a.domain_id
      GROUP BY d.id, d.name
      ORDER BY studentCount DESC
    `);

    // Get year-wise statistics
    const [yearlyStats] = await db.query(`
      SELECT 
        YEAR(date) as year,
        COUNT(id) as activityCount,
        SUM(studentsParticipated) as studentCount
      FROM Activity
      GROUP BY YEAR(date)
      ORDER BY year DESC
    `);

    // Get month-wise statistics for current year
    const [monthlyStats] = await db.query(`
      SELECT 
        DATE_FORMAT(date, '%M') as month,
        COUNT(id) as activityCount,
        SUM(studentsParticipated) as studentCount
      FROM Activity
      WHERE YEAR(date) = YEAR(CURRENT_DATE())
      GROUP BY MONTH(date), DATE_FORMAT(date, '%M')
      ORDER BY MONTH(date)
    `);

    // Get top 5 activities by participation
    const [topActivities] = await db.query(`
      SELECT 
        a.name,
        d.name as domain,
        a.studentsParticipated,
        DATE_FORMAT(a.date, '%d %b %Y') as date
      FROM Activity a
      JOIN Domain d ON a.domain_id = d.id
      ORDER BY a.studentsParticipated DESC
      LIMIT 5
    `);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalActivities: overallStats[0].totalActivities || 0,
          totalStudents: overallStats[0].totalStudents || 0,
          totalDomains: overallStats[0].totalDomains || 0,
        },
        domainStats: domainStats,
        yearlyStats: yearlyStats,
        monthlyStats: monthlyStats,
        topActivities: topActivities
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error: ' + error.message },
      { status: 500 }
    );
  }
}
