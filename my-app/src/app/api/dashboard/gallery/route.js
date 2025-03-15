import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const { domain, imageLink } = await req.json();

    if (!domain || !imageLink) {
      return NextResponse.json({ error: 'Domain and image link are required' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    // Insert the image link into the Gallery table
    await connection.execute(
      'INSERT INTO Gallery (imageLink, domain_id) VALUES (?, ?)',
      [imageLink, domain]
    );

    connection.release();

    console.log('Received data:', { domain, imageLink });

    return NextResponse.json({ success: true, message: 'Image added successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}