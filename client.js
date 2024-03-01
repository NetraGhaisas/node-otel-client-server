const { metrics } = require('@opentelemetry/api');
const express = require('express');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

const meter = metrics.getMeter('basic-otel-app', '0.1.0');
const counter = meter.createCounter('basic-otel-app.requests.counter');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

app.get('/hello', (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});

function sendRequestsMetric() {
    // Generate a random metric value
    const requests = getRandomNumber(1, 10)

    // Update the counter metric
    counter.add(requests, {
        [SemanticResourceAttributes.SERVICE_NAME]: 'basic-requests-service',
    });

    // Log the emitted metric
    console.log(`Emitted metric: requests=${requests}`);
}
setInterval(sendRequestsMetric, 5000);