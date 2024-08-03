import { z } from "zod";
import {
    createUserSchema,
    updateUserSchema,
    updateUserPasswordSchema,
    updateUserProfilePictureSchema,
    requestUserPasswordRecoveryLinkSchema,
} from "../validations/user.validation";

export type IRequestCreateUser = z.infer<typeof createUserSchema>;
export type IRequestUpdateUser = z.infer<typeof updateUserSchema>;
export type IRequestUpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
export type IRequestUpdateUserProfilePictureSchema = z.infer<typeof updateUserProfilePictureSchema>;
export type IRequestUserPasswordRecoveryLinkSchema = z.infer<typeof requestUserPasswordRecoveryLinkSchema>;

export type ICreateUser =  { 
    cpf: string, 
    name: string, 
    email: string, 
    address: string, 
    password: string, 
};

export type IUpdateUser = { 
    id: string, 
    email?: string, 
    address?: string, 
    password?: string, 
    profilePicture?: string 
};

export type IDatabaseUser = {
    id: string;
    cpf: string;
    name: string;
    email: string;
    address: string;
    password: string;
    profilePicture: string;
};
