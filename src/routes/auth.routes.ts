import { Router } from "express";
import { login } from "../controller/auth.controller";
import { loginSchema } from "../validations/auth.validation";
import { validateRequest } from "../middlewares/validation.middleware";

const routes = Router();

routes.post("/login", validateRequest(loginSchema, 'body'), login);

export { routes };
