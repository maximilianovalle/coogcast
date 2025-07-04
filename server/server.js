const express = require('express'); // import express
const app = express();              // create app instance
const db = require('./database');   // database.js connection

const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],   // accept requests from this url only
};
app.use(cors(corsOptions));

const PORT = 8080;

// displayDiv.jsx /getRecent
app.get("/getRecent", async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM weather ORDER BY "currTimestamp" DESC LIMIT 1');
        console.log("Most recent snapshot fetched.");
        res.json({
            timestamp: result.rows[0].currTimestamp,
            temp_fahrenheit: result.rows[0].tempFahrenheit,
            humidity: result.rows[0].humidityPercentage,
        });
    } catch (error) {
        console.error("ERROR: unable to fetch most recent temperature snapshot. ")
        res.json(500).json({ error: "Failed to fetch data." });
    }
})

// run app
app.listen(PORT, () => {
    console.log(`✔ Server started on port ${PORT}.`);
})