import { QueryFailedError } from "typeorm";
import { ErrorMiddleware } from "../interfaces/express.interface";
import { DatabaseError } from "../services/error.service";

const handleError: ErrorMiddleware = (error, request, response, next) => {
    if(error instanceof QueryFailedError) {
        const err = new DatabaseError('Database operation failed', error.message);
        
        return err.sendError(response);    
    };

    return error.sendError(response);
};

export default handleError;
