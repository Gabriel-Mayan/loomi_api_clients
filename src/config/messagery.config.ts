import { config } from 'dotenv';
import { KafkaConfig } from 'kafkajs';

config();

const ssl = parseInt(process.env.USE_SSL ?? "0") ? {
    ca: process.env.BROKER_SSL,
    rejectUnauthorized: false,
} : undefined;

export const serviceMailConfig: KafkaConfig = {
    ssl,
    clientId: 'service-mail',
    brokers: [process.env.BROKER ?? ""],
    retry: {
        maxRetryTime: 10000,
        initialRetryTime: 100,
        factor: 0.3,
        multiplier: 2,
        retries: 200,
        restartOnFailure: async () => true,
    },
};
