import { ValidationMiddleware } from "../interfaces/express.interface";

export const validateRequest: ValidationMiddleware = (schema, property) => (request, response, next) => {
    const data = property ? request[property] : request;
    schema.parse(data);

    next();
};
