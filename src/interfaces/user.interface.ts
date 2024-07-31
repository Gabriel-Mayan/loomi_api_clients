import { z } from "zod";
import { createUserSchema, updateUserSchema, requestUserPasswordRecoveryLinkSchema } from "src/validations/user.validation";

export type IRequestCreateUser = z.infer<typeof createUserSchema>;
export type IRequestUpdateUser = z.infer<typeof updateUserSchema>;
export type IRequestUserPasswordRecoveryLinkSchema = z.infer<typeof requestUserPasswordRecoveryLinkSchema>;

export type IDatabaseUser = {
    id: string;
    cpf: string;
    name: string;
    email: string;
    address: string;
    password: string;
    profilePicture: string;
};
