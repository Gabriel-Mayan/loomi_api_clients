/* eslint-disable max-len */
import * as dotenv from 'dotenv';
import { EachMessagePayload, Kafka } from 'kafkajs';

import { serviceMailConfig } from '../config/messagery.config';
import { recoveryPasswordMailSent } from 'src/helpers/mail.helper';

dotenv.config();

const serviceMail = new Kafka(serviceMailConfig);
const serviceMailProducer = serviceMail.producer();
const serviceMailEvents = ['recovery-password-mail-sent'];

serviceMailConsumer();

export async function serviceMailConsumer() {
    try {
        if (!serviceMailProducer) {
            throw new Error(`Kafka not connected`);
        }

        const consumer = serviceMail.consumer({ groupId: process.env.BROKER_GROUP_ID ?? 'defaultGroup' });
        await consumer.subscribe({ topics: serviceMailEvents, fromBeginning: false });
        await consumer.connect();

        await consumer.run({
            eachMessage: async ({ topic, message }: Readonly<EachMessagePayload>) => {
                try {
                    const consumerFunction = getConsumerFunctionByTopic({ topic });

                    if (consumerFunction && message.value) {
                        const jsonMessage = JSON.parse(message.value.toString());

                        await consumerFunction(jsonMessage);
                    }
                } catch (err) {
                    console.error(err);
                }
            },
        });

        return true;
    } catch (error) {
        console.log(error);
    }
}

export async function serviceMailSender({ topic, message }: { topic: string, message: any }) {
    try {
        await serviceMailProducer.connect();

        const response = await serviceMailProducer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        await serviceMailProducer.disconnect();

        return response;
    } catch (error) {
        console.log(error);
    }
}

export function getConsumerFunctionByTopic({ topic }: { topic: string }) {
    switch (topic) {
        case 'recovery-password-mail-sent':
            return recoveryPasswordMailSent;
        default:
            return null;
    }
}
