const express = require('express');

const PORT = parseInt(process.env.PORT || '4000');
const app = express();

app.get('/hello', (req, res) => {
    res.send("Hello world!");
});

app.post('/v1/metrics', (req, res) => {
    console.log(req)
    console.log("POST: Received metrics!");
    res.send("Received metrics!");
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});