import { ValidationError } from "../services/error.service";
import { ValidationMiddleware } from "../interfaces/express.interface";

export const validateRequest: ValidationMiddleware = (schema, property) => (request, response, next) => {
    try {
        const data = property ? request[property] : request;
        schema.parse(data);
    
        next();        
    } catch (error) {
        throw new ValidationError(error);
    }
};
