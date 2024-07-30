import { verify, sign } from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);

export const validateToken = (token: string) => verify(token, JWT_SECRET);
export const generateUserToken = (user: any) => sign(user, JWT_SECRET, { expiresIn: "24h" });