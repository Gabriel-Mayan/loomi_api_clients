import { Request } from '../interfaces/express.interface';

export const login: Request = async (request, response) => {
    return response.status(200).send({ });
};