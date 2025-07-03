const express = require('express'); // import express
const app = express();              // create app instance
const db = require('./database');

const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],   // accept requests from this url only
};
app.use(cors(corsOptions));

const PORT = 8080;

// sends fruits array as response when request is made to /api route
app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "banana", "cherry"] })
});

// run app
app.listen(PORT, () => {
    console.log(`✔ Server started on port ${PORT}.`);
})