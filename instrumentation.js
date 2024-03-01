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
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

const promExporter = new PrometheusExporter({ port: 9464, startServer: true });

const OTLPExporter = new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: 'http://127.0.0.1:4000/api/metrics',
            headers: {},
        }),
        exportIntervalMillis: 5000,
    });

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'basic-otel-app',
        [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
    }),
    //   traceExporter: new ConsoleSpanExporter(),
    metricReader: OTLPExporter,

      instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
