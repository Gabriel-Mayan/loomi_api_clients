import { Router } from "express";

import { createUser, deleteUser, getUserById, updateUser, updateUserPassword, updateUserProfilePicture } from "../controller/user.controller";

import { idSchema } from "../validations/all.validation";

import { authentication } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validation.middleware";

const routes = Router();

routes.get('/:id', validateRequest(idSchema, "query"), getUserById);

routes.post("/create", createUser);

routes.patch("/update", authentication, updateUser);
routes.patch("/update/password", authentication, updateUserPassword);
routes.patch("/update/profile-picture", authentication, updateUserProfilePicture);

routes.delete("/delete", authentication, deleteUser);

export { routes };
