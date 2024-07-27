/* eslint-disable functional/no-return-void */
import * as dotenv from 'dotenv';

import server from "./http";

dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost';

server.listen(port, () => console.log(`Running on ${host}:${port}`));
