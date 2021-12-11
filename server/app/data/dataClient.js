const { Pool } = require('pg');

console.log("URL", process.env.DATABASE_URL);

const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

module.exports = client;