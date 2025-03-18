import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Get total activities and students
    const [activityStats] = await db.query(`
      SELECT 
        COUNT(*) as totalActivities,
        SUM(studentsParticipated) as totalStudents
      FROM Activity
    `);

    // Get domain statistics with student count
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

    // Get yearly statistics
    const [yearlyStats] = await db.query(`
      SELECT 
        YEAR(date) as year,
        COUNT(*) as activityCount,
        SUM(studentsParticipated) as studentCount
      FROM Activity
      GROUP BY YEAR(date)
      ORDER BY year ASC
    `);

    // Get monthly activity count (last 6 months)
    const [monthlyStats] = await db.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m-01') as monthStart,
        DATE_FORMAT(date, '%b %Y') as month,
        COUNT(*) as activityCount,
        SUM(studentsParticipated) as studentCount
      FROM Activity
      WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
      GROUP BY monthStart, month
      ORDER BY monthStart ASC
    `);

    // Get top activities
    const [topActivities] = await db.query(`
      SELECT 
        a.name,
        DATE_FORMAT(a.date, '%d %b %Y') as date,
        a.studentsParticipated,
        d.name as domain
      FROM Activity a
      JOIN Domain d ON a.domain_id = d.id
      ORDER BY a.date DESC
      LIMIT 5
    `);

    const formattedStats = {
      success: true,
      data: {
        overview: {
          totalActivities: activityStats[0]?.totalActivities || 0,
          totalStudents: activityStats[0]?.totalStudents || 0,
          totalDomains: domainStats.length || 0,
          avgParticipation: activityStats[0]?.totalActivities > 0 
            ? Math.round(activityStats[0].totalStudents / activityStats[0].totalActivities) 
            : 0
        },
        domainStats: domainStats,
        yearlyStats: yearlyStats,
        monthlyStats: monthlyStats,
        topActivities: topActivities.map(activity => ({
          name: activity.name,
          date: activity.date,
          studentsParticipated: activity.studentsParticipated,
          domain: activity.domain
        }))
      }
    };

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error: ' + error.message },
      { status: 500 }
    );
  }
}
