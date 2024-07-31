import { z } from "zod";
import { loginSchema } from "src/validations/auth.validation";

export type IRequestLogin = z.infer<typeof loginSchema>;
