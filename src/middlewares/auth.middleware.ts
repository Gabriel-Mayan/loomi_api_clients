import { validateToken } from "../utils/token.util";
import { UserRepository } from "../repositories/user.repository";
import { AuthMiddleware } from "../interfaces/express.interface";

export const authentication: AuthMiddleware = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new Error("Not authorization");
    }

    const token = authorization.replace("Bearer", "").trim();
    const tokenInfo = validateToken(token);

    if (typeof tokenInfo === "string") {
        throw new Error("Invalid Token");
    }

    const user = await UserRepository.findUser({ email: tokenInfo.email });

    if (!user) {
        throw new Error("Invalid Token");
    }

    request.user = user;

    next();
};
