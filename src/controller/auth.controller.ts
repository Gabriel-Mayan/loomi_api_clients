import { Request } from '../interfaces/express.interface';
import { IRequestLogin } from '../interfaces/auth.interface';

import { UserRepository } from '../repositories/user.repository';
import { comparePassword } from '../utils/encryptation.util';
import { generateUserToken } from '../utils/token.util';

export const login: Request<IRequestLogin> = async (request, response) => {
    const { email, password } = request.body;

    const user = await UserRepository.findUser({ email });

    if (!user) {
      throw new Error("Username or password is invalid");
    }

    const verifiedPassword = await comparePassword(password, user.password);

    if (!verifiedPassword) {
        throw new Error("Username or password is invalid");
    };

    const token = generateUserToken({ email });

    return response.status(200).json({ token });
};