import { Router } from "express";

import { 
    createUser, 
    deleteUser, 
    getUserById, 
    getUsers, 
    updateUser, 
    updateUserPassword, 
    updateUserProfilePicture 
} from "../controller/user.controller";

import { idSchema } from "../validations/all.validation";
import { createUserSchema, updateUserPasswordSchema, updateUserProfilePictureSchema, updateUserSchema } from "../validations/user.validation";

import { authentication } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validation.middleware";

const routes = Router();

routes.get('/', authentication, getUsers);
routes.get('/:id', authentication, validateRequest(idSchema, "params"), getUserById);

routes.post("/create", validateRequest(createUserSchema, "body"), createUser);

routes.patch("/update", authentication, validateRequest(updateUserSchema, "body"), updateUser);
routes.patch("/update/password", authentication, validateRequest(updateUserPasswordSchema, "body"), updateUserPassword);
routes.patch("/update/profile-picture", authentication, validateRequest(updateUserProfilePictureSchema, "body"), updateUserProfilePicture);

routes.delete("/delete", authentication, deleteUser);

export { routes };
