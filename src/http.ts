import cors from "cors";
import helmet from "helmet";
import express from "express";
import { createServer } from "http";

import { routes } from "./routes";
import { corsConfig } from "./config/cors.config";

import logger from "./services/logger.service";
import handleErrors from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(helmet());

app.use(handleErrors);
app.use(cors(corsConfig));
app.use(routes);
app.use(logger);

const server = createServer(app);

export default server;
