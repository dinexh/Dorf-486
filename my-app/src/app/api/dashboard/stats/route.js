import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Get total activities
    const [activitiesCount] = await db.query(`
      SELECT COUNT(*) as total FROM Activity
    `);
    
    // Get total students participated
    const [studentsCount] = await db.query(`
      SELECT SUM(studentsParticipated) as total FROM Activity
    `);

    // Get total domains
    const [domainsCount] = await db.query(`
      SELECT COUNT(*) as total FROM Domain
    `);

    // Get upcoming events (activities with future dates)
    const [upcomingCount] = await db.query(`
      SELECT COUNT(*) as total FROM Activity 
      WHERE date > CURRENT_DATE()
    `);

    // Get monthly growth (last 6 months) - Fixed GROUP BY
    const [monthlyGrowth] = await db.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as yearMonth,
        DATE_FORMAT(MIN(date), '%b %Y') as month,
        COUNT(*) as count
      FROM Activity
      WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(date, '%Y-%m')
      ORDER BY yearMonth ASC
    `);

    // Get top domains by activity count
    const [topDomains] = await db.query(`
      SELECT 
        d.name,
        COUNT(a.id) as count
      FROM Domain d
      LEFT JOIN Activity a ON d.id = a.domain_id
      GROUP BY d.id, d.name
      ORDER BY count DESC
      LIMIT 5
    `);

    // Get recent activities - No GROUP BY needed
    const [recentActivities] = await db.query(`
      SELECT 
        name,
        DATE_FORMAT(date, '%d %b %Y') as date,
        studentsParticipated as participants
      FROM Activity
      WHERE date <= CURRENT_DATE()
      ORDER BY date DESC
      LIMIT 5
    `);

    const formattedStats = {
      success: true,
      data: {
        totalActivities: activitiesCount[0].total || 0,
        totalStudents: studentsCount[0].total || 0,
        totalDomains: domainsCount[0].total || 0,
        upcomingEvents: upcomingCount[0].total || 0,
        monthlyGrowth: monthlyGrowth.map(item => ({
          month: item.month,
          count: item.count
        })),
        topDomains: topDomains.map(item => ({
          name: item.name,
          count: item.count
        })),
        recentActivities: recentActivities.map(item => ({
          name: item.name,
          date: item.date,
          participants: item.participants
        }))
      }
    };

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Database error: ' + error.message 
      },
      { status: 500 }
    );
  }
}
