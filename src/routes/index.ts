import "express-async-errors";
import { Router } from "express";

import { routes as userRoutes } from "./user.routes";

const routes = Router();

routes.use("/api/users", userRoutes);
routes.use("/api/recovery-password", userRoutes);

export { routes };
