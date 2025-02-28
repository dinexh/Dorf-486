const bcrypt = require('bcrypt');
const saltRounds = 10;

async function generateHash(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
}

generateHash('Dinesh@123');
generateHash('Karthik@123');
