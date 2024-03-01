// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
    getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

const { Resource } = require('@opentelemetry/resources');
const {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');

const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')

const {
    OTLPMetricExporter,
  } = require('@opentelemetry/exporter-metrics-otlp-http');

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'otel-app',
        [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
    }),
    //   traceExporter: new ConsoleSpanExporter(),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: 'http://127.0.0.1:4318/v1/metrics',
            headers: {},
        }),
        exportIntervalMillis: 10000,
    }),
      instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
