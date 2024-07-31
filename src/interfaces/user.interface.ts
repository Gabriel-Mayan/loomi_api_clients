import { z } from "zod";
import { createUserSchema, updateUserSchema } from "src/validations/user.validation";

export type IRequestCreateUser = z.infer<typeof createUserSchema>;
export type IRequestUpdateUser = z.infer<typeof updateUserSchema>;

export type IDatabaseUser = {
    id: string;
};
