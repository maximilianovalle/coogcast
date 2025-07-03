require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
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