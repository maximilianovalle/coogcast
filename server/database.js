require('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool ({
    host: process.env.HOST,
    port: process.env.PORT || 8080,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    },
});

const testDBConnection = async () => {
    try {
        const response = await pool.query('SELECT NOW()');
        console.log("✔ Connected to PostgreSQL DB:", response.rows[0].now);
    } catch (error) {
        console.error("✗ Failed to connect to PostgreSQL DB:", error);
        process.exit(1);
    }
};

testDBConnection();
module.exports = pool;