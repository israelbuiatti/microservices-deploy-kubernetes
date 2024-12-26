import {
    diag,
    DiagConsoleLogger,
    DiagLogLevel
} from '@opentelemetry/api'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { KnexInstrumentation } from '@opentelemetry/instrumentation-knex'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR)

const sdk = new NodeSDK({
    serviceName: 'ms-venda-backend',
    traceExporter: new OTLPTraceExporter({
        url: 'http://otel-collector:4317',
        compression: 'gzip'
    }),
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new KnexInstrumentation()
        
    ]
})

process.on('beforeExit', async () => {
    await sdk.shutdown()
})

export const initalizeTracing = async () => {
    return sdk.start()
}