import helmet from "helmet";
import express from "express";
import { createServer } from "http";

const app = express();

app.use(express.json());
app.use(helmet());

const server = createServer(app);

export default server;