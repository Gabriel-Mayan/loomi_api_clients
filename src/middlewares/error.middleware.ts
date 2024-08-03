import { QueryFailedError } from "typeorm";
import { ErrorMiddleware } from "../interfaces/express.interface";
import { DatabaseError, ConflitError, InternalError, NotFoundError, RequestFieldError, AuthenticationError } from "../services/error.service";

const handleError: ErrorMiddleware = (error, request, response, next) => {
    if(error instanceof QueryFailedError) {
        const err = new DatabaseError('Database operation failed', error.message);
        
        return err.sendError(response);    
    };

    if (
        error instanceof ConflitError ||
        error instanceof DatabaseError ||
        error instanceof InternalError ||
        error instanceof NotFoundError ||
        error instanceof RequestFieldError ||
        error instanceof AuthenticationError
    ) {
        return error.sendError(response);
    }

    const internalError = new InternalError(`An unexpected error occurred: ${error.message}`);
    
    return internalError.sendError(response);
};

export default handleError;
