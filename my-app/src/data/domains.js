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

const DOMAIN_IDS = {
    'Agriculture': 5,
    'Cultural Exchange': 11,
    'Digital Literacy': 9,
    'Green Innovation': 10,
    'Health & Hygiene': 3,  // Note: Slightly different name in DB (Health and Hygiene)
    'Livelihood Enhancement': 8,
    'Quality Education': 4,
    'Social Community Actions': 7,  // Note: Slightly different name in DB
    'Village Infrastructure': 6,    // Note: Slightly different spelling in DB
    'Water Conservation': 1,        // Note: Different spelling in DB (Water Conversation)
    'Women Empowerment': 2,
    'Energy Availbility & Efficiency': null  // This domain doesn't exist in DB
};
