import mysql from 'mysql2/promise';
import 'dotenv/config';

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

const activities = [
    [
        {
            "name": "Clean Water & Sanitation Exhibition",
            "date": "8/10/2024",
            "domain_id": "Water Conservation",
            "studentsParticipated": "68",
            "reportLink": "https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024%2FClean%20Water%20%26%20Sanitation%20Exhibition%2Epdf%2Epdf%20%281%29%2Epdf%20%281%29%2Epdf%20%281%29%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024&ga=1"
        },
        {
            "name": "DRAWING COMPETITION",
            "date": "01-10-2024",
            "domain_id": "Education",
            "studentsParticipated": "15",
            "reportLink": "https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024%2FDRAWING%20COMPETITION%2Epdf%20%281%29%2Epdf%20%281%29%2Epdf%20%281%29%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024&ga=1"
        },
        {
            "name": "First-Aid Training Workshop (CPR) (Phase-4)",
            "date": "16-10-2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "28",
            "reportLink": "https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024%2FFirst%2DAid%20Training%20Workshop%28CPR%29%28Phase%2D4%29%2Epdf%20%281%29%2Epdf%2Epdf%20%281%29%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024&ga=1"
        },
        {
            "name": "Global Hand Washing Day",
            "date": "15-10-2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "69",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/ET1naAl4KbdMs-xpd_fokS4B-to5vfSw5CeUPpxgQdBbhg?e=YAiErc"
        },
        {
            "name": "Green School Program (Phase-1)",
            "date": "3/10/2024",
            "domain_id": "Green Innovation",
            "studentsParticipated": "59",
            "reportLink": "https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024%2FGreen%20School%20Program%20%28Phase%2D1%29%2Epdf%2Epdf%20%281%29%2Epdf%20%281%29%2Epdf%20%281%29%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024&ga=1"
        },
        {
            "name": "Livestock Management Training",
            "date": "23-10-2024",
            "domain_id": "Education",
            "studentsParticipated": "45",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/ESvqq7EYkuRCq6cvItGe-rEBa3lqxsY6L8El16PiXqx-UA?e=117SVG"
        },
        {
            "name": "SWATCHATHA HI SEVA",
            "date": "2/10/2024",
            "domain_id": "Community Actions",
            "studentsParticipated": "74",
            "reportLink": "https://kluniversityin-my.sharepoint.com/personal/brambabu_kluniversity_in/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024%2FSWATCHATHA%20HI%20SEVA%2Epdf%20%282%29%20%281%29%2Epdf%2Epdf&parent=%2Fpersonal%2Fbrambabu%5Fkluniversity%5Fin%2FDocuments%2FSVR%20OCTOBER%20MONTH%20REPORTS%202024&ga=1"
        },
        {
            "name": "Training On Internet Safety (Phase-1)",
            "date": "22-10-2024",
            "domain_id": "Green Innovation",
            "studentsParticipated": "30",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/EfTMaja6lY5Ftwf7QniRIpIBo2XJxWqRuRkmLpRJgDdbMQ?e=F90NUv"
        },
        {
            "name": "Tree Adoption Campaign (Phase-2)",
            "date": "2/10/2024",
            "domain_id": "Green Innovation",
            "studentsParticipated": "74",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/EWcAUddZm5BGiWp2lkeCFScBq1ogc0xZJlFu5_IoigfSpQ?e=L6YV5k"
        },
        {
            "name": "Vriksharopam Mahotsav (Tree Plantation) (Phase-4)",
            "date": "1/10/2024",
            "domain_id": "Green Innovation",
            "studentsParticipated": "74",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/ETqvO7s5cOZFiUiviRAMSRwBXsqa5AjNtvKcarCrXFLDKA?e=yfGXKw"
        },
        {
            "name": "Workshop on Balanced Nutrition and Healthy Eating Habits",
            "date": "16-10-2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "65",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/EQY-DaQiXsZOhGd2qVyK3kUBlGXZ6OLKvivl_zS84juJfw?e=06o0JD"
        },
        {
            "name": "Workshop On Agroforestry",
            "date": "25-10-2024",
            "domain_id": "Agriculture",
            "studentsParticipated": "42",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/Ef7nzuNC23JHmFZZAiFxftYBN1zJWN-JHahCVGJJpsz1_Q?e=KauAxp"
        },
        {
            "name": "Workshop on Rain Water Harvesting Techniques (Phase-2)",
            "date": "18-10-2024",
            "domain_id": "Water Conservation",
            "studentsParticipated": "28",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/brambabu_kluniversity_in/EYvnvPZ4wjpKsI-A0Hs4pSMBVr6zcuH9Pl7tlxv7gqaB2w?e=Yqj7Fr"
        },
        {
            "name": "Awareness Propgrammes & Rallies on Usage of Plastic",
            "date": "11.07.2022",
            "domain_id": "Material and Resources",
            "studentsParticipated": "82",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/92.pdf"
        },
        {
            "name": "World Population Day",
            "date": "11/7/2022",
            "domain_id": "Community Actions",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/93.pdf"
        },
        {
            "name": "Workshops on Cloth Bags Jute Bags Making",
            "date": "16.07.2022",
            "domain_id": "Community Actions",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/94.pdf"
        },
        {
            "name": "Awareness on Waste Management and Sanitation at Seetharamapuram Thanda Village",
            "date": "19.07.2022",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "74",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/95.pdf"
        },
        {
            "name": "Workshop on Energy Conservation and Renewable Energy System",
            "date": "22.07.2022",
            "domain_id": "Energy Availability and Efficiency",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/96.pdf"
        },
        {
            "name": "Workshop on Writing Skills",
            "date": "23.07.2022",
            "domain_id": "Education",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/97.pdf"
        },
        {
            "name": "Out Reach Program at Near by School",
            "date": "25.07.2022",
            "domain_id": "Education",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/98.pdf"
        },
        {
            "name": "Sanitation and Hygienic Awareness at Morsumalli Thanda",
            "date": "28.07.2022",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "70",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/99.pdf"
        },
        {
            "name": "Electricity connection to all households including from alternative sources of energy",
            "date": "14.08.2022",
            "domain_id": "Energy Availability and Efficiency",
            "studentsParticipated": "110",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/100.pdf"
        },
        {
            "name": "Farm Program on Finding and Trouble Shooting Farming Problems",
            "date": "25.09.2022",
            "domain_id": "Agriculture",
            "studentsParticipated": "88",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/101.pdf"
        },
        {
            "name": "Awareness Program on Importance of Food",
            "date": "16.10.2022",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "49",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/102.pdf"
        },
        {
            "name": "Workshop on Economic Development on promoting Diversified Agriculture Livelihood",
            "date": "23.10.2022",
            "domain_id": "Agriculture",
            "studentsParticipated": "57",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/103.pdf"
        },
        {
            "name": "Workshop on Plant Protection & Importance\n  of Organic Manures in Farming",
            "date": "06.11.2022",
            "domain_id": "Agriculture",
            "studentsParticipated": "57",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/104.pdf"
        },
        {
            "name": "Awareness of Soil Health & Soil Conservation",
            "date": "11.12.2022",
            "domain_id": "Agriculture",
            "studentsParticipated": "59",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/105.pdf"
        },
        {
            "name": "Workshop on Urban Farming & Terrace Gardening",
            "date": "02.01.2023",
            "domain_id": "Agriculture",
            "studentsParticipated": "60",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/106.pdf"
        },
        {
            "name": "Economic Development through Practicing Hygiene Behaviors",
            "date": "30.01.2023",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "52",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/107.pdf"
        },
        {
            "name": "Awarness of the importance of pulse in the regular diet at Sitarampuramthanda",
            "date": "12.02.2023",
            "domain_id": "Community Actions",
            "studentsParticipated": "54",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/108.pdf"
        },
        {
            "name": "Human Development",
            "date": "14.03.2023",
            "domain_id": "Community Actions",
            "studentsParticipated": "39",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/109.pdf"
        },
        {
            "name": "Human Development Smart School For Providing Quality Education, Adult Literacy, Village Libraries",
            "date": "03.02.2023",
            "domain_id": "Community Actions",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/110.pdf"
        },
        {
            "name": "Awareness on Tree plantation at Dasullapalem",
            "date": "16.04.2023",
            "domain_id": "Green Innovation",
            "studentsParticipated": "59",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/111.pdf"
        },
        {
            "name": "Work shop on BEE keeping and Mushroom Cultivation.",
            "date": "17.05.2023",
            "domain_id": "Green Innovation",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/112.pdf"
        },
        {
            "name": "Blood Grouping at Dasullapalem",
            "date": "07.01.2022",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "87",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/186.pdf"
        },
        {
            "name": "Awareness on Health and Hygiene at Ganapavaram",
            "date": "08.01.2022",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "94",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/187.pdf"
        },
        {
            "name": "Health Camp at Porat Nagar",
            "date": "18.01.2022",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "86",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/188.pdf"
        },
        {
            "name": "Plantation at Sitharamapuram Thanda",
            "date": "24.01.2022",
            "domain_id": "Green Innovation",
            "studentsParticipated": "92",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/189.pdf"
        },
        {
            "name": "Pilot study on Buildings (Govt.), residential buildings, interior and exterior architecture at Revendrapadu",
            "date": "09.02.2022",
            "domain_id": "Village Infrastructure",
            "studentsParticipated": "92",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/190.pdf"
        },
        {
            "name": "Pilot study on energy conservation & power consumption at Chirravuru",
            "date": "14.02.2022",
            "domain_id": "Energy Availability and Efficiency",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/191.pdf"
        },
        {
            "name": "Awareness in Technology at Chirravuru",
            "date": "18.02.2022",
            "domain_id": "Energy Availability and Efficiency",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/192.pdf"
        },
        {
            "name": "Pilot study on agriculture, resources at Revendrapadu",
            "date": "04.03.2022",
            "domain_id": "Agriculture",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/193.pdf"
        },
        {
            "name": "Projects on conservation Energy at Chirravuru",
            "date": "08.03.2022",
            "domain_id": "Energy Availability and Efficiency",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/194.pdf"
        },
        {
            "name": "Awareness program on sustainable agriculture at Revendrapadu",
            "date": "14.03.2022",
            "domain_id": "Agriculture",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/195.pdf"
        },
        {
            "name": "Implementing solutions with technology at Pedapalem Village",
            "date": "18.03.2022",
            "domain_id": "Energy Availability and Efficiency",
            "studentsParticipated": "74",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/196.pdf"
        },
        {
            "name": "Pilot study on students concerning education at Peddapalem village",
            "date": "13.04.2022",
            "domain_id": "Education",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/197.pdf"
        },
        {
            "name": "Awareness program on importance of education at Revendrapadu",
            "date": "18.04.2022",
            "domain_id": "Education",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/198.pdf"
        },
        {
            "name": "Awareness program for girl students on social works at Vaddeswaram",
            "date": "21.04.2022",
            "domain_id": "Women Empowerment",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/199.pdf"
        },
        {
            "name": "Creating learning hub at Pedapalem village",
            "date": "23.04.2022",
            "domain_id": "Education",
            "studentsParticipated": "89",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/200.pdf"
        },
        {
            "name": "Village development Program at Gundimeda",
            "date": "02.05.2022",
            "domain_id": "Community Actions",
            "studentsParticipated": "71",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/201.pdf"
        },
        {
            "name": "Projects to be deployed for the problems identified at Chinnapalem",
            "date": "03.05.2022",
            "domain_id": "Material and Resources",
            "studentsParticipated": "71",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/202.pdf"
        },
        {
            "name": "Pilot Study on Facilities at Srungarapuram",
            "date": "11.05.2022",
            "domain_id": "Village Infrastructure",
            "studentsParticipated": "71",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/203.pdf"
        },
        {
            "name": "Pilot study on Recreations areas at vedurubeedem",
            "date": "22.06.2022",
            "domain_id": "Village Infrastructure",
            "studentsParticipated": "65",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/204.pdf"
        },
        {
            "name": "Identification of local mentors at Porat Nagar village",
            "date": "25.06.2022",
            "domain_id": "Community Actions",
            "studentsParticipated": "69",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/205.pdf"
        },
        {
            "name": "Competitions planned at community level in Pondugula Village",
            "date": "28.06.2022",
            "domain_id": "Community Actions",
            "studentsParticipated": "54",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/206.pdf"
        },
        {
            "name": "Awareness on safe Disposal of Used Masks in K L E F-SVR Adopted Villages",
            "date": "15.07.2020",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/314.pdf"
        },
        {
            "name": "Awareness on Swatchata Activities in K L E F-SVR Adopted Villages",
            "date": "27.07.2020",
            "domain_id": "Green Innovation",
            "studentsParticipated": "82",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/315.pdf"
        },
        {
            "name": "Awareness on \n De- Worming for the children in K L E F-SVR Adopted Villages",
            "date": "16.08.2020",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/316.pdf"
        },
        {
            "name": "Tree Plantation in \n K L E F-SVR Adopted Villages",
            "date": "19.08.2020",
            "domain_id": "Green Innovation",
            "studentsParticipated": "82",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/317.pdf"
        },
        {
            "name": "Awareness on Clay Vinayaka -Eco Friendly Idols in K L E F-SVR Adopted Villages",
            "date": "22.08.2020",
            "domain_id": "Green Innovation",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/318.pdf"
        },
        {
            "name": "Rain water harvesting in K L E F-SVR Adopted Villages",
            "date": "13.08.2020 to 15.09.2020",
            "domain_id": "Water Conservation",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/319.pdf"
        },
        {
            "name": "World Ozone Day in K L E F-SVR Adopted Villages",
            "date": "16.09.2020",
            "domain_id": "Green Innovation",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/320.pdf"
        },
        {
            "name": "Awareness on New Education Policy in K L E F-SVR Adopted Villages",
            "date": "24.09.2020",
            "domain_id": "Education",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/321.pdf"
        },
        {
            "name": "Fences Anganwadi School in Porat Nagar",
            "date": "30.09.2020",
            "domain_id": "Village Infrastructure",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/322.pdf"
        },
        {
            "name": "House hold survey at Dasulapalem",
            "date": "17.09.2019",
            "domain_id": "Community Actions",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/393.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Pulluru",
            "date": "22.08.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/394.pdf"
        },
        {
            "name": "Rain water Harvesting at Musunuru",
            "date": "19.12.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/395.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Dasulapalem",
            "date": "16.10.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/396.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Sitarampuram Thanda",
            "date": "10.10.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/397.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Pinapaka",
            "date": "20.08.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/398.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Vellaturu",
            "date": "27.08.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/399.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Porat nagar",
            "date": "03.09.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/400.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Kanimarla",
            "date": "10.09.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/401.pdf"
        },
        {
            "name": "Awareness camp on ODF Kanimarla",
            "date": "17.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/402.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at Veduru Bedum",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/403.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at Porat nagar",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/404.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at Dasulapalem",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/405.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at Sitarampuram Thanda",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/406.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at vellaturu",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/407.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at Pinapaka",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "86",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/408.pdf"
        },
        {
            "name": "Awareness camp On Plastic free at Kanimarla",
            "date": "27.09.2019",
            "domain_id": "Material and Resources/ Green Innovations",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/409.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at Vedurubedum",
            "date": "16.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/410.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at Porat nagar",
            "date": "16.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/411.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at Dasulapalem",
            "date": "17.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/412.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at Vellaturu",
            "date": "18.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/413.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at pinapaka",
            "date": "18.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/414.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at Sitarampuram Thanda",
            "date": "20.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/415.pdf"
        },
        {
            "name": "Awareness camp on Open Defecation Free at Dasulapalem",
            "date": "20.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/416.pdf"
        },
        {
            "name": "Plantation at Dasulapalem",
            "date": "06.08.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/417.pdf"
        },
        {
            "name": "Plantation at Sitarampuram Thanda",
            "date": "13.08.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/418.pdf"
        },
        {
            "name": "Plantation at Vellaturu",
            "date": "27.11.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "86",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/419.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Porat nagar",
            "date": "03.11.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/420.pdf"
        },
        {
            "name": "Plantation with Geo tagging at Kanimarla",
            "date": "16.12.2019",
            "domain_id": "Green Innovation",
            "studentsParticipated": "88",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/421.pdf"
        },
        {
            "name": "Medical Camp at Vellaturu",
            "date": "23.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/422.pdf"
        },
        {
            "name": "Medical Camp at Pinapaka",
            "date": "20.07.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/423.pdf"
        },
        {
            "name": "Medical Camp at Dasulapalem",
            "date": "27.07.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/424.pdf"
        },
        {
            "name": "Medical Camp at \n Porat nagar",
            "date": "17.08.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/425.pdf"
        },
        {
            "name": "Medical Camp at Kanimarla",
            "date": "24.08.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/426.pdf"
        },
        {
            "name": "Medical Camp at Sitarampuram Thanda",
            "date": "31.08.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/427.pdf"
        },
        {
            "name": "Medical Camp at vedurubedam",
            "date": "14.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/428.pdf"
        },
        {
            "name": "Medical Camp at Vellaturu",
            "date": "15.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/429.pdf"
        },
        {
            "name": "Medical Camp at Pinapaka",
            "date": "30.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/430.pdf"
        },
        {
            "name": "Medical Camp at Dasulapalem",
            "date": "07.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/431.pdf"
        },
        {
            "name": "Medical Camp at Porat nagar",
            "date": "14.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/432.pdf"
        },
        {
            "name": "Medical Camp at Kanimarla",
            "date": "21.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/433.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Vellaturu",
            "date": "10.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/434.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Kanimarla",
            "date": "16.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/435.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Porat nagar",
            "date": "14.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/436.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Dasulapalem",
            "date": "15.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "97",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/437.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Pinapaka",
            "date": "17.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/438.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Pulluru",
            "date": "10.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/439.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Sitarampuram tanda",
            "date": "10.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "87",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/440.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Vedurubedam",
            "date": "18.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/441.pdf"
        },
        {
            "name": "Awareness camp on Anemia at Mylavaram",
            "date": "19.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/442.pdf"
        },
        {
            "name": "Organisation of vermicompost at Vellaturu",
            "date": "22.02.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/443.pdf"
        },
        {
            "name": "Kitchen Gardening at Vellaturu",
            "date": "11.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/444.pdf"
        },
        {
            "name": "Kitchen Gardening at Dasulapalem",
            "date": "18.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/445.pdf"
        },
        {
            "name": "Kitchen Gardening at Kanimarla",
            "date": "20.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/446.pdf"
        },
        {
            "name": "Kitchen Gardening at Porat nagar",
            "date": "22.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/447.pdf"
        },
        {
            "name": "Kitchen Gardening at Sitarampuram Thanda",
            "date": "22.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/448.pdf"
        },
        {
            "name": "Kitchen Gardening at Pinapaka",
            "date": "23.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/449.pdf"
        },
        {
            "name": "Kitchen Gardening at Vedurubedam",
            "date": "24.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "81",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/450.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Vellaturu",
            "date": "14.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/451.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Sitaram puram Thanda",
            "date": "15.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "97",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/452.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Kanimarla",
            "date": "17.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/453.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Pinapaka",
            "date": "20.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "94",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/454.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Dasulapalem",
            "date": "14.09.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/455.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Porat nagar",
            "date": "18.10.2019",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/456.pdf"
        },
        {
            "name": "Awareness on Hand Wash at Pulluru",
            "date": "10.01.2020",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/457.pdf"
        },
        {
            "name": "Painting work at Velvadam",
            "date": "01.12.2019 to 30.12.2019",
            "domain_id": "Village Infrastructure",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/458.pdf"
        },
        {
            "name": "House hold survey at Dasulapalem",
            "date": "16.11.2019",
            "domain_id": "Community Actions",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/459.pdf"
        },
        {
            "name": "House hold survey at Sabjapadu",
            "date": "14.12.2019 to 15.12.2019",
            "domain_id": "Community Actions",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/460.pdf"
        },
        {
            "name": "House hold survey at Kanimarla",
            "date": "28.12.2019 to 29.12.2019",
            "domain_id": "Community Actions",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/461.pdf"
        },
        {
            "name": "House hold survey at Pinapaka",
            "date": "27.01.2020",
            "domain_id": "Community Actions",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/462.pdf"
        },
        {
            "name": "Art and craft work to the School children at Pulluru",
            "date": "27.02.2020",
            "domain_id": "Education",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/463.pdf"
        },
        {
            "name": "Art and craft work to the School children at Dasulapalem",
            "date": "22.02.2020",
            "domain_id": "Education",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/464.pdf"
        },
        {
            "name": "Art and craft work to the School children at Sitaram Puram thanda",
            "date": "30.01.2020",
            "domain_id": "Education",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/465.pdf"
        },
        {
            "name": "Art and craft work to the School children at Kanimarla",
            "date": "02.01.2020",
            "domain_id": "Education",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/466.pdf"
        },
        {
            "name": "Art and craft work to the School children at Porat nagar",
            "date": "04.01.2020",
            "domain_id": "Education",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/467.pdf"
        },
        {
            "name": "Art and craft work to the School children at Pinapaka",
            "date": "05.01.2020",
            "domain_id": "Education",
            "studentsParticipated": "97",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/468.pdf"
        },
        {
            "name": "Art and craft work to the School children at Vellaturu",
            "date": "06.02.2020",
            "domain_id": "Education",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/469.pdf"
        },
        {
            "name": "Art and craft work to the School children at Mylavaram",
            "date": "07.02.2020",
            "domain_id": "Education",
            "studentsParticipated": "83",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/470.pdf"
        },
        {
            "name": "Art and craft work to the School children at G. Konduru",
            "date": "11.02.2020",
            "domain_id": "Education",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/471.pdf"
        },
        {
            "name": "Art and craft work to the School children at Vedurubedam",
            "date": "13.02.2020",
            "domain_id": "Education",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/472.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Vellaturu",
            "date": "15.11.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "80",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/473.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Veduru bedam",
            "date": "03.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "84",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/474.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Kanimarla",
            "date": "04.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/475.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Dasulapalem",
            "date": "06.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/476.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Sitarampuram Thanda",
            "date": "07.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/477.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Pulluru",
            "date": "10.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "89",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/478.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Pinapaka",
            "date": "12.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "87",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/479.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Mylavaram",
            "date": "14.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "91",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/480.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Porat nagar",
            "date": "15.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "87",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/481.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Sabjapadu",
            "date": "18.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/482.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Keerthirayunigudem",
            "date": "21.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "90",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/483.pdf"
        },
        {
            "name": "Awareness on Solid waste management at Chegireddigudem",
            "date": "22.09.2019",
            "domain_id": "Material and Resources",
            "studentsParticipated": "85",
            "reportLink": "https://www.kluniversity.in/iqac-files/SSR-2023/c3/3.6.2/Activities/484.pdf"
        },
        {
            "name": "VRIKSHAROPAM MAHOTSAV (Tree Plantation Drive)",
            "date": "22.07.2024",
            "domain_id": "Green Innovation",
            "studentsParticipated": "35",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/Ef6tm29AADxEny3h5pVMtgMBbw7s4gewqSJWFXcD4hqW-w?e=v4t6aG"
        },
        {
            "name": "Rural Agroforestry Workshop",
            "date": "22.07.2024",
            "domain_id": "Agriculture",
            "studentsParticipated": "35",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/ERx-pbQ6oeVChk87f1qNLoIBj6pHVsFULG826jeWZSIeuw?e=AT80wc"
        },
        {
            "name": "Community Tree Census",
            "date": "23.07.2024",
            "domain_id": "Agriculture",
            "studentsParticipated": "20",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/EcQpgjHwKshEtor05IK9fmUBcw3rag47hN34DR499WcjOg?e=h49Xj6"
        },
        {
            "name": "Safai Abhiyan (Cleanliness Drive) (Phase-1)",
            "date": "23.07.2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "20",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/Ecypk5DgVdxGgHrQHPCw_aYBnUzodRtSsXlonxM9D2EixA?e=c9SIYL"
        },
        {
            "name": "Sanitation Awareness Workshop",
            "date": "24.07.2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "28",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/EYOoX66JUWNOrc-b2fQ4XUUBGMFe3dsozW0ymUp9aQednw?e=fT6X4I"
        },
        {
            "name": "Education Awareness workshop",
            "date": "24.07.2024",
            "domain_id": "Education",
            "studentsParticipated": "28",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/EcAxgPw5sJxDldfBo_HpVhIBNaaULj_9OaEsOilWpQzWBg?e=Ih3kPN"
        },
        {
            "name": "Personal hygiene & sanitation awareness workshop",
            "date": "25.07.2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "16",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/ESQ1KZGxwAdLrej-hk1BcOwBuLWC6i4RVakV_rBuOkRNOw?e=0MOJ6o"
        },
        {
            "name": "First-Aid training workshop (CPR)(Phase-1)",
            "date": "26.07.2024",
            "domain_id": "Health and Hygiene",
            "studentsParticipated": "23",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/EbP8V2rq_9FIhndFtRtq4JMB9O_x6-z1JQ1R7yKjQgBR8A?e=W0Gj5A"
        },
        {
            "name": "Awareness workshop on waterborne diseases",
            "date": "27.07.2024",
            "domain_id": "Water Conservation",
            "studentsParticipated": "31",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/EQs1ITQQaHhDsaqqwcjVm0kB-TOicc3RD7t6TbOod1Y5VA?e=8ToJyi"
        },
        {
            "name": "Mobile security workshop",
            "date": "29.07.2024",
            "domain_id": "Community Actions",
            "studentsParticipated": "27",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/Ec9uFrsuK9ZEvv5_VxOQ3PgBPpsjRrzNRAKkt8xbbPAZPA?e=SRmCOA"
        },
        {
            "name": "Workshops on Compost Making",
            "date": "30.07.2024",
            "domain_id": "Community Actions",
            "studentsParticipated": "29",
            "reportLink": "https://kluniversityin-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/EfAHmvfYmNZAv6vV_k65gEEBEDIBvab83YwypDXUxBq16A?e=lIBIwq"
        },
        {
            "name": "Water Management Workshop",
            "date": "31.07.2024",
            "domain_id": "Water Conservation",
            "studentsParticipated": "42",
            "reportLink": "https://klunive:n-my.sharepoint.com/:b:/g/personal/2300040028_kluniversity_in/Ec9XmyFe9bdDhKBdEiYzuDkBK3I69T-ebRgkpUfopy3JBg?e=0gm9Qe"
        }
    ]
]
function parseDate(dateStr) {
    // If the date contains "to", take the first date
    if (dateStr.includes('to')) {
        dateStr = dateStr.split('to')[0].trim();
    }
    
    try {
        // Handle DD.MM.YYYY format
        if (dateStr.includes('.')) {
            const [day, month, year] = dateStr.split('.');
            dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        // Handle DD-MM-YYYY format
        else if (dateStr.includes('-')) {
            const [day, month, year] = dateStr.split('-');
            dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        // Handle M/D/YYYY format
        else if (dateStr.includes('/')) {
            const [month, day, year] = dateStr.split('/');
            dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return date.toISOString().slice(0, 19).replace('T', ' ');
    } catch (error) {
        console.error(`Error parsing date: ${dateStr}`);
        throw error;
    }
}

async function insertActivities() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Connected to database successfully');

        for (const activity of activities[0]) {
            try {
                const formattedDate = parseDate(activity.date);
                let domainId = domainMapping[activity.domain_id];
                
                if (!domainId) {
                    // If domain not in mapping, try to create it
                    console.log(`Domain not found in mapping: ${activity.domain_id}`);
                    domainId = await ensureDomainExists(connection, activity.domain_id);
                    domainMapping[activity.domain_id] = domainId; // Update mapping
                }
                
                await connection.execute(
                    'INSERT INTO Activity (name, date, domain_id, studentsParticipated, reportLink) VALUES (?, ?, ?, ?, ?)',
                    [
                        activity.name,
                        formattedDate,
                        domainId,
                        activity.studentsParticipated,
                        activity.reportLink
                    ]
                );
                console.log(`Inserted activity: ${activity.name}`);
            } catch (error) {
                console.error(`Failed to insert activity: ${activity.name}`);
                console.error(`Date value was: ${activity.date}`);
                console.error(error);
                continue;
            }
        }

        console.log('All activities processed');

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