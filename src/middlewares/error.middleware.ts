import { ErrorMiddleware } from "../interfaces/express.interface";

const handleError: ErrorMiddleware = (error, request, response, next) => {
    console.log(error);

    return response.status(400).send({ message: error.message });
};

export default handleError;