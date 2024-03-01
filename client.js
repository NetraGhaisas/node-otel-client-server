const express = require('express');

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

app.get('/hello', (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});

// setInterval(() => {
//     // Generate a random metric value
//     const value = getRandomNumber(1,10)

//     // Update the counter metric
//     counter.add(value, {
//         [SemanticResourceAttributes.SERVICE_NAME]: 'example-service',
//     });

//     // Log the emitted metric
//     console.log(`Emitted metric: example_counter=${value}`);
// }, 2000);