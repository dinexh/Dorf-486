import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();

    // Query to select a random image from each domain
    const [heroImages] = await connection.query(`
      SELECT g.imageLink, d.name AS domainName
      FROM Gallery g
      JOIN Domain d ON g.domain_id = d.id
      WHERE g.id IN (
        SELECT id FROM (
          SELECT id FROM Gallery WHERE domain_id = g.domain_id ORDER BY RAND() LIMIT 1
        ) AS subquery
      )
    `);

    // Query to select all images grouped by domain
    const [allImages] = await connection.query(`
      SELECT g.imageLink, d.name AS domainName
      FROM Gallery g
      JOIN Domain d ON g.domain_id = d.id
      ORDER BY d.name, g.id
    `);

    connection.release();

    return NextResponse.json({ heroImages, allImages });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}