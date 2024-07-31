
import { Request } from '../interfaces/express.interface';
import { IRequestCreateUser, IRequestUpdateUser, IRequestUserPasswordRecoveryLinkSchema } from '../interfaces/user.interface';

import { UserRepository } from '../repositories/user.repository';
import { RecoveryPasswordRepository } from '../repositories/recovery-password.repository';

import { addTime, isAfterDate } from '../utils/date.util';
import { encryptPassword } from '../utils/encryptation.util';

import { recoveryPasswordMailSend } from '../helpers/mail.helper';
import { InternalError, NotFoundError, RequestFieldError } from '../services/error.service';

export const getUserById: Request = async (request, response) => {
    const { id } = request.params;

    const user = await UserRepository.getUserById({ id });

    return response.status(200).send({ user });
};

export const createUser: Request<IRequestCreateUser> = async (request, response) => {
    const { name, email, address, password, cpf } = request.body;

    const encryptedPassword = await encryptPassword(password);

    await UserRepository.createUser({ cpf, name, email, address, password: encryptedPassword });

    return response.status(200).send({ message: "User registered successfully!" });
};

export const updateUser: Request<IRequestUpdateUser> = async (request, response) => {
    const { user } = request;
    const { email, address } = request.body;

    const updatedUser = await UserRepository.updateUser({ id: user.id, email, address });

    if (!updatedUser.affected) {
        throw new RequestFieldError("Error updating user");
    }

    return response.status(200).send({ message: "User updated successfully!" });
};

export const deleteUser: Request = async (request, response) => {
    const { user } = request;

    const userDeleted = await UserRepository.deleteUser({ id: user.id });

    if (!userDeleted.affected) {
        throw new RequestFieldError("Error when deleting user...");
    }

    return response.status(200).send({ message: "User deleted successfully!" });
};

// TODO
export const updateUserPassword: Request = async (request, response) => {
    return response.status(200).send({});
};

// TODO
export const updateUserProfilePicture: Request = async (request, response) => {
    return response.status(200).send({});
};

export const requestUserPasswordRecoveryLink: Request<IRequestUserPasswordRecoveryLinkSchema> = async (request, response) => {
    const { email } = request.body;

    const user = await UserRepository.findUser({ email });

    if (!user) {
        throw new NotFoundError("User does not exist");
    }

    const databaseRecovery = await RecoveryPasswordRepository.createRecovery({
        expiresIn: addTime(new Date(), { hours: 3 }),
        user,
    });

    if (!databaseRecovery.identifiers.length) {
        throw new InternalError("Error when create request...");
    }

    await recoveryPasswordMailSend({ to: user.email, code: databaseRecovery.identifiers[0] });

    return response.status(200).send({ message: "Request successfully sent!" });
};

export const updateUserPasswordWithRecoveryLink: Request = async (request, response) => {
    const { code } = request.params;
    const { password } = request.body;
  
    const registeredRequest = await RecoveryPasswordRepository.findRecovery({ id: code });
  
    if (!registeredRequest || !registeredRequest.mailSent) {
        throw new RequestFieldError("Request does not exist...");
    }
  
    const expiredTime = isAfterDate(new Date(), registeredRequest.expiresIn);
  
    if (expiredTime) {
        throw new RequestFieldError("Request timeout expired...");
    }
  
    const newPassword = await encryptPassword(password);
    const userUpdated = await UserRepository.updateUser({id: registeredRequest.user.id, password: newPassword });
  
    if (!userUpdated.affected) {
        throw new InternalError("Error when updating password....");
    }
  
    return response.status(200).send({ message: "Password retrieved successfully!" });
};
