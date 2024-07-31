import { z } from "zod";

import { validateCpf } from "../helpers/validation.helper";
import { validateSpecialCharacters } from "../utils/regex.util";

export const createUserSchema = z.object({
  cpf: z.string().refine((cpf) => validateCpf({ cpf }), { message: "Inválid CPF" }),
  name: z.string().min(2).regex(validateSpecialCharacters),
  email: z.string().email(),
  address: z.string(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
  message: "Password and confirmPassword must match",
  path: ["confirmPassword"], // indica que a validação falha em confirmPassword
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  address: z.string().optional(),
});
