const express = require('express'); // import express
const app = express();              // create app instance
const db = require('./database');   // database.js connection

const cors = require('cors');

const corsOptions = {
    // accept requests from these URLs only

    // origin: [process.env.CLIENT_URL,
    //     process.env.CLIENT_URL_SECOND,
    // ],

    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// const PORT = process.env.PORT || 8080;
const PORT = 8080;

// displayDiv.jsx /weather/recent
app.get("/weather/recent", async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM weather ORDER BY "currTimestamp" DESC LIMIT 1');
        console.log("Most recent snapshot fetched.");

        res.json({
            timestamp: result.rows[0].currTimestamp,
            temp_fahrenheit: result.rows[0].tempFahrenheit,
            humidity: result.rows[0].humidityPercentage,
        });
    } catch (error) {
        console.error("ERROR: unable to fetch most recent snapshot.");
        res.status(500).json({ error: "Failed to fetch data." });
    }
})

// graphsDiv.jsx /weather/past
app.get("/weather/past", async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM weather ORDER BY "currTimestamp" DESC LIMIT 5');
        console.log("Past snapshots fetched.");

        const resultRows = result.rows.slice().reverse().map(row => ({
            timestamp: row.currTimestamp,
            temp_fahrenheit: row.tempFahrenheit,
            humidity: row.humidityPercentage,
        }));

        res.json(resultRows);
    } catch (error) {
        console.error("ERROR: unable to fetch past snapshots.");
        res.status(500).json({ error: "Failed to fetch data." });
    }
})

// little-paw /weather
app.post("/weather/update", async (req, res) => {
    try {
        // TODO: POST DATA TO DATABASE
    } catch (error) {
        console.error("ERROR: unable to post current temperature + humidity.");
        res.status(500).json({ error: "Failed to post data." });
    }
})

// run app
app.listen(PORT, () => {
    console.log(`✔ Server started on port ${PORT}.`);
})