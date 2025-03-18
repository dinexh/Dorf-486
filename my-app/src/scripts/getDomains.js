import pool from '../lib/db.js';

async function getDomains() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM Domain');
        connection.release();
        console.log('Available domains:', rows);
    } catch (error) {
        console.error('Error fetching domains:', error);
    } finally {
        process.exit();
    }
}

getDomains(); 