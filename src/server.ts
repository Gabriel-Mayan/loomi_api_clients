/* eslint-disable functional/no-return-void */
import "reflect-metadata";
import * as dotenv from 'dotenv';

import server from "./http";
import dataSource from "./services/database.service";
import { serviceMailConsumer } from "./services/messagery.service";

dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

dataSource.initialize().then(() => {
    console.log("Connection initialized with database...");

    serviceMailConsumer()
        .then(() => (console.log('Mail consumer starts...')))
        .catch((err) => (console.log('Mail consumer fail...')));

    server.listen(port, () => console.log(`Running on http://${host}:${port}`));
}).catch((error: Error) => console.log(error));
