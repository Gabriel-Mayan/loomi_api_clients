import { Router } from "express";
import { login } from "../controller/auth.controller";

const routes = Router();

routes.post("/login", login);

export { routes };
