import cors from "cors";
import helmet from "helmet";
import express from "express";
import { createServer } from "http";

import { corsConfig } from "./config/cors.config";

import logger from "./services/logger.service";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors(corsConfig));
app.use(logger);

const server = createServer(app);

export default server;
