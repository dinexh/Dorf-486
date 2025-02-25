import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

try {
    await pool.query("SELECT 1");
    console.log("Connected to MySQL");
} catch (error) {
    console.error("Error connecting to MySQL:", error);
}

export default pool;