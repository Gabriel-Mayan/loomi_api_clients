
import { Request } from '../interfaces/express.interface';
import { IRequestCreateUser, IRequestUpdateUser, IRequestUserPasswordRecoveryLinkSchema } from '../interfaces/user.interface';

import { UserRepository } from '../repositories/user.repository';
import { RecoveryPasswordRepository } from '../repositories/recovery-password.repository';

import { addTime, isAfterDate } from '../utils/date.util';
import { encryptPassword } from '../utils/encryptation.util';

import { recoveryPasswordMailSend } from '../helpers/mail.helper';

export const getUserById: Request = async (request, response) => {
    const { id } = request.params;

    const user = await UserRepository.getUserById({ id });

    return response.status(200).send({ user });
};

export const createUser: Request<IRequestCreateUser> = async (request, response) => {
    const { name, email, address, password, cpf } = request.body;

    const encryptedPassword = await encryptPassword(password);

    await UserRepository.createUser({ cpf, name, email, address, password: encryptedPassword });

    return response.status(200).send({ message: "Usuario cadastrado com sucesso!" });
};

export const updateUser: Request<IRequestUpdateUser> = async (request, response) => {
    const { user } = request;
    const { email, address } = request.body;

    const updatedUser = await UserRepository.updateUser({ id: user.id, email, address });

    if (!updatedUser.affected) {
        throw new Error("Erro ao atualizar usuario");
    }

    return response.status(200).send({ message: "Usuario atualizado com sucesso!" });
};

export const deleteUser: Request = async (request, response) => {
    const { user } = request;

    const userDeleted = await UserRepository.deleteUser({ id: user.id });

    if (!userDeleted.affected) {
        throw new Error("Erro ao deletar usuario");
    }

    return response.status(200).send({ message: "Usuario deletado com sucesso!" });
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
        throw new Error("User does not exist");
    }

    const databaseRecovery = await RecoveryPasswordRepository.createRecovery({
        expiresIn: addTime(new Date(), { hours: 3 }),
        user,
    });

    if (!databaseRecovery.identifiers.length) {
        throw new Error("Recovery does not created");
    }

    await recoveryPasswordMailSend({ to: user.email, code: databaseRecovery.identifiers[0] });

    return response.status(200).send({ message: "Request successfully sent!" });
};

export const updateUserPasswordWithRecoveryLink: Request = async (request, response) => {
    const { code } = request.params;
    const { password } = request.body;
  
    const registeredRequest = await RecoveryPasswordRepository.findRecovery({ id: code });
  
    if (!registeredRequest || !registeredRequest.mailSent) {
        throw new Error("Request does not exist");
    }
  
    const expiredTime = isAfterDate(new Date(), registeredRequest.expiresIn);
  
    if (expiredTime) {
        throw new Error("Request error: expired uuid.");
    }
  
    const newPassword = await encryptPassword(password);
    const userUpdated = await UserRepository.updateUser({id: registeredRequest.user.id, password: newPassword });
  
    if (!userUpdated.affected) {
        throw new Error("unable to update password.");
    }
  
    return response.status(200).send({ message: "password retrieved successfully!" });
};
