const express = require('express'); // import express
const app = express();              // create app instance
const db = require('./database');   // database.js connection

const cors = require('cors');
const corsOptions = {
    origin: [process.env.CLIENT_URL],   // accept requests from this url only
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

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

        const resultRows = result.rows.slice().reverse().map(row => ({
            timestamp: row.currTimestamp,
            temp_fahrenheit: row.tempFahrenheit,
            humidity: row.humidityPercentage,
        }));

        // const resultRows = [
        //     { timestamp: result.rows[4].currTimestamp, temp_fahrenheit: result.rows[4].tempFahrenheit, humidity: result.rows[4].humidityPercentage },
        //     { timestamp: result.rows[3].currTimestamp, temp_fahrenheit: result.rows[3].tempFahrenheit, humidity: result.rows[3].humidityPercentage },
        //     { timestamp: result.rows[2].currTimestamp, temp_fahrenheit: result.rows[2].tempFahrenheit, humidity: result.rows[2].humidityPercentage },
        //     { timestamp: result.rows[1].currTimestamp, temp_fahrenheit: result.rows[1].tempFahrenheit, humidity: result.rows[1].humidityPercentage },
        //     { timestamp: result.rows[0].currTimestamp, temp_fahrenheit: result.rows[0].tempFahrenheit, humidity: result.rows[0].humidityPercentage },
        // ];

        res.json(resultRows);
    } catch (error) {
        console.error("ERROR: unable to fetch past snapshots.");
        res.status(500).json({ error: "Failed to fetch data." });
    }
})

// little-paw /weather
// app.post("/weather", async (req, res) => {
//     try {
//         console.log("LITTLE-PAW: ", req);
//     } catch (error) {
//         console.error("ERROR: unable to post current temperature + humidity.");
//         res.status(500).json({ error: "Failed to post data." });
//     }
// })

// run app
app.listen(PORT, () => {
    console.log(`✔ Server started on port ${PORT}.`);
})