import { z } from "zod";
import { loginSchema } from "../validations/auth.validation";

export type IRequestLogin = z.infer<typeof loginSchema>;
