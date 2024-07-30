import { UserRepository } from '../repositories/user.repository';
import { Request } from '../interfaces/express.interface';

export const getUserById: Request = async (request, response) => {
    const { id } = request.params;

    const user = await UserRepository.getUserById({ id });

    return response.status(200).send({ user });
};

export const createUser: Request = async (request, response) => {
    return response.status(200).send({});
};

export const updateUser: Request = async (request, response) => {
    return response.status(200).send({});
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

export const deleteUser: Request = async (request, response) => {
//     const { user } = request;

//     const userDeleted = await UserRepository.deleteUser({ id: user.id });

//     if (!userDeleted.affected) {
//         throw Error("Erro ao deletar usuario");
//     }

    return response.status(200).send({ message: "Usuario deletado com sucesso!" });
};
