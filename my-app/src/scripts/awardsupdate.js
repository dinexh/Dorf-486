import mysql from 'mysql2/promise';

const awardData = [
    {
        image_link: "https://i.imghippo.com/files/QI7955AxM.png",
        description: "KL University won the 'Outreach and Society' award for its Smart Village Revolution (SVR), recognizing efforts in rural development and societal well-being.",
        award_date: "2022-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/jlUa1209myY.png",
        description: "Mr. K. UdayKiran won the 'Best Project of the Year' award from the Police Department for his innovative security alarm system, enhancing safety in villages.",
        award_date: "2023-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/zmXC3389OaI.png",
        description: "Chaitanya and Kalyan received the award from the Election Commission of India for innovative public awareness initiatives.",
        award_date: "2024-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/rc8332QE.png",
        description: "Mr. J. V. Kalyan received appreciation from HANDS for his outstanding contribution to Cardiopulmonary Resuscitation (CPR) training.",
        award_date: "2024-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/qh5232gvs.png",
        description: "Received the Fellowship Award from APSACS Department for exceptional contributions to public health and awareness initiatives.",
        award_date: "2024-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/FD9892Urk.png",
        description: "Received the 27TH NATIONAL YOUTH FESTIVAL Award from ministry of youth affairs and sports.",
        award_date: "2024-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/Gd2054A.png",
        description: "Sk. Sameera has been appointed as the Zonal Incharge for AISU (All India Students Union), showcasing her leadership and dedication to student welfare in Community development.",
        award_date: "2024-01-01"
    },
    {
        image_link: "https://i.imghippo.com/files/Fk7604VQ.png",
        description: "D. Amarnadh secured 1st prize in the National-level Agri-Drone competition, demonstrating exceptional innovation and expertise in agricultural technology.",
        award_date: "2023-01-01"
    },
];

async function addAwards() {
    // Create a connection pool
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Dinesh@123', // Using the password from your array.js file
        database: 'svr_klef',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    let connection;
    try {
        connection = await pool.getConnection();
        
        // Insert each award
        for (const award of awardData) {
            await connection.query(
                'INSERT INTO awards (image_link, description, award_date) VALUES (?, ?, ?)',
                [award.image_link, award.description, award.award_date]
            );
            console.log(`Added award: ${award.description.substring(0, 50)}...`);
        }

        console.log('All awards added successfully!');
    } catch (error) {
        console.error('Error adding awards:', error);
    } finally {
        if (connection) connection.release();
        await pool.end();
    }
}

// Run the function
addAwards();
