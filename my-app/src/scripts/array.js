import mysql from 'mysql2/promise';
import 'dotenv/config';
const activities = require('./updatedArray.js').default || require('./updatedArray.js');

// Create a separate connection pool for this script
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',  // replace with your MySQL username
    password: 'Dinesh@123',  // replace with your MySQL password
    database: 'svr_klef',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Update domain mapping to match database values
const domainMapping = {
    'Water Conservation': 1,  // Maps to 'Water Conversation'
    'Education': 4,          // Maps to 'Quality Education'
    'Health and Hygiene': 3,
    'Green Innovation': 10,
    'Community Actions': 7,  // Maps to 'Social community Actions'
    'Agriculture': 5,
    'Material and Resources': 10, // Maps to 'Green Innovation' (closest match)
    'Energy Availability and Efficiency': 6, // Maps to 'Village infrastuture'
    'Village Infrastructure': 6,  // Maps to 'Village infrastuture'
    'Women Empowerment': 2,
    'Material and Resources/ Green Innovations': 10, // Maps to 'Green Innovation'
    'Digital Literacy': 9,
    'Cultural Exchange': 11,
    'Livelihood Enhancement': 8
};

// Add this function to handle domain creation
async function ensureDomainExists(connection, domainName) {
    try {
        // Check if domain exists
        const [rows] = await connection.execute(
            'SELECT id FROM Domain WHERE name = ?',
            [domainName]
        );

        if (rows.length === 0) {
            // Domain doesn't exist, insert it
            const [result] = await connection.execute(
                'INSERT INTO Domain (name) VALUES (?)',
                [domainName]
            );
            console.log(`Created new domain: ${domainName} with ID: ${result.insertId}`);
            return result.insertId;
        } else {
            return rows[0].id;
        }
    } catch (error) {
        console.error(`Error ensuring domain exists: ${domainName}`, error);
        throw error;
    }
}

// Add domain assignments for each activity
// const activities = 

// Fix the parseDate function
function parseDate(dateStr) {
    try {
        // If the date is already in YYYY-MM-DD format, return it
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            return dateStr + ' 00:00:00';
        }

        let parts;
        if (dateStr.includes('.')) {
            parts = dateStr.split('.');
        } else if (dateStr.includes('-')) {
            parts = dateStr.split('-');
        } else if (dateStr.includes('/')) {
            parts = dateStr.split('/');
        } else {
            throw new Error('Unsupported date format');
        }

        // Ensure we have exactly 3 parts
        if (parts.length !== 3) {
            throw new Error('Invalid date format');
        }

        // Determine if year is first or last
        let year, month, day;
        if (parts[0].length === 4) {
            [year, month, day] = parts;
        } else if (parts[2].length === 4) {
            [day, month, year] = parts;
        } else {
            throw new Error('Cannot determine year position');
        }

        // Pad month and day with zeros if needed
        month = month.padStart(2, '0');
        day = day.padStart(2, '0');

        return `${year}-${month}-${day} 00:00:00`;
    } catch (error) {
        console.error(`Error parsing date: ${dateStr}`);
        throw error;
    }
}

// Add this debug line
console.log('Activities loaded:', Array.isArray(activities), activities && activities.length);

// Add this after loading activities
console.log('Total activities:', activities.length);
console.log('Sample activity:', activities[0]);

async function insertActivities() {
    let connection;
    let successCount = 0;
    let errorCount = 0;

    try {
        connection = await pool.getConnection();
        console.log('Connected to database successfully');

        for (const activity of activities) {
            try {
                if (!activity || !activity.date) {
                    console.error('Invalid activity:', activity);
                    errorCount++;
                    continue;
                }

                const formattedDate = parseDate(activity.date);
                const domainId = activity.domain ? domainMapping[activity.domain] : null;
                
                await connection.execute(
                    'INSERT INTO Activity (name, date, domain_id, studentsParticipated, reportLink) VALUES (?, ?, ?, ?, ?)',
                    [
                        activity.name || 'Unnamed Activity',
                        formattedDate,
                        domainId,
                        activity.studentsParticipated || 0,
                        activity.reportLink || null
                    ]
                );
                console.log(`Inserted activity: ${activity.name}`);
                successCount++;
            } catch (error) {
                console.error(`Failed to insert activity: ${activity.name || 'Unknown'}`);
                console.error(`Date value was: ${activity.date}`);
                console.error(error);
                errorCount++;
                continue;
            }
        }

        console.log(`All activities processed. Success: ${successCount}, Errors: ${errorCount}`);
    } catch (error) {
        console.error('Error in main process:', error);
        throw error;
    } finally {
        if (connection) {
            connection.release();
            console.log('Database connection released');
        }
        await pool.end();
    }
}

insertActivities()
    .then(() => {
        console.log('Script completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Script failed:', error);
        process.exit(1);
    });