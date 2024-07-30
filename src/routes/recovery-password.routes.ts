import { Router } from "express";
import { requestUserPasswordRecoveryLink, updateUserPasswordWithRecoveryLink } from "../controller/user.controller";

const routes = Router();

routes.post("/", requestUserPasswordRecoveryLink);
routes.patch("/:code", updateUserPasswordWithRecoveryLink);

export { routes };
