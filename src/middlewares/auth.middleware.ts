import { validateToken } from "../utils/token.util";
import { UserRepository } from "../repositories/user.repository";
import { AuthMiddleware } from "../interfaces/express.interface";
import { AuthenticationError } from "../services/error.service";

export const authentication: AuthMiddleware = async (request, response, next) => {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AuthenticationError('Token was not sent in the request');
    }

    const token = authorization.replace("Bearer", "").trim();
    const tokenInfo = validateToken(token);

    if (typeof tokenInfo === "string") {
        throw new AuthenticationError('Invalid Token');
    }

    const user = await UserRepository.findUser({ email: tokenInfo.email });

    if (!user) {
        throw new AuthenticationError('Invalid Token');
    }

    request.user = user;

    next();
};
