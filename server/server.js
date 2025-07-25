const express = require('express'); // import express
const app = express();              // create app instance
const db = require('./database');   // database.js connection

const cors = require('cors');

const corsOptions = {
    // accept requests from these URLs only
    origin: [process.env.CLIENT_URL,
        process.env.CLIENT_URL_SECOND,
        "http://localhost:5173"
    ],
};

app.use(cors(corsOptions));
app.use(express.json());    // parse JSON payloads

const PORT = process.env.PORT;
// const PORT = 8080;   // development PORT

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

// little-paw /weather/update
app.post("/weather/update", async (req, res) => {
    const authHeader = req.headers['x-device-secret'];

    if (authHeader != process.env.ESP32_KEY) {
        console.warn("Unauthorized device tried to POST data.");
        return res.status(403).json({ error: "Unauthorized device." });
    }

    try {
        const { tempFahrenheit, humidityPercentage } = req.body;
        await db.query ('INSERT INTO weather ("tempFahrenheit", "humidityPercentage") VALUES ($1, $2)', [tempFahrenheit, humidityPercentage]);

        console.log(`✔ Data inserted: Temp=${tempFahrenheit}°F, Humidity=${humidityPercentage}%`);
        res.status(200).json({ message: "Data retrieved and stored." });
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ error: "Failed to retrieve and store data." });
    }
})

// run app
app.listen(PORT, () => {
    console.log(`✔ Server started on port ${PORT}.`);
})