import "express-async-errors";
import { Router } from "express";

import { routes as authRoutes } from "./auth.routes";
import { routes as userRoutes } from "./user.routes";
import { routes as recoveryPasswordRoutes } from "./recovery-password.routes";

const routes = Router();

routes.use("/api/auth", authRoutes);
routes.use("/api/users", userRoutes);
routes.use("/api/recovery-password", recoveryPasswordRoutes);

export { routes };
