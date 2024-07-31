import { UserRepository } from '../repositories/user.repository';

import { Request } from '../interfaces/express.interface';
import { IRequestCreateUser, IRequestUpdateUser } from '../interfaces/user.interface';

import { encryptPassword } from '../utils/encryptation.util';

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
        throw Error("Erro ao atualizar usuario");
    }

    return response.status(200).send({ message: "Usuario atualizado com sucesso!" });
};

export const deleteUser: Request = async (request, response) => {
    const { user } = request;

    const userDeleted = await UserRepository.deleteUser({ id: user.id });

    if (!userDeleted.affected) {
        throw Error("Erro ao deletar usuario");
    }

    return response.status(200).send({ message: "Usuario deletado com sucesso!" });
};

export const updateUserPassword: Request = async (request, response) => {
    return response.status(200).send({});
};

export const updateUserProfilePicture: Request = async (request, response) => {
    return response.status(200).send({});
};

export const requestUserPasswordRecoveryLink: Request = async (request, response) => {
    return response.status(200).send({});
};

export const updateUserPasswordWithRecoveryLink: Request = async (request, response) => {
    return response.status(200).send({});
};
