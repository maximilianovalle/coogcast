const express = require('express'); // import express
const app = express();              // create app instance

const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],   // accept requests from this url only
};

app.use(cors(corsOptions));

// sends fruits array as response when request is made to /api route
app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "banana", "cherry", "orange"] })
});

// run app
app.listen(8080, () => {
    console.log("✓ Server started on port 8080.");
})