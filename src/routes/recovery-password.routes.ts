import { Router } from "express";
import { requestUserPasswordRecoveryLink, updateUserPasswordWithRecoveryLink } from "../controller/user.controller";

import { validateRequest } from "../middlewares/validation.middleware";
import { requestUserPasswordRecoveryLinkSchema } from "../validations/user.validation";

const routes = Router();

routes.post("/", validateRequest(requestUserPasswordRecoveryLinkSchema), requestUserPasswordRecoveryLink);
routes.patch("/:code", updateUserPasswordWithRecoveryLink);

export { routes };
