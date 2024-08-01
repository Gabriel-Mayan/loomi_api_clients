import { hash, compare } from "bcryptjs";

export const encryptPassword = async ({ password }: { password: string }) => await hash(password, 10);

export const comparePassword = async ({ password, comparePassword }: { password: string, comparePassword: string }) => {
    return await compare(password, comparePassword);
} 