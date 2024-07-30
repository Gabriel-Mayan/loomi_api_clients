import { FindOptionsWhere, InsertResult, UpdateResult } from "typeorm";

import { User } from "../entities/user.entity";

import { IDatabaseUser } from "../interfaces/user.interface";

import AppDataSource from "../services/database.service";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
    getUserById({ id }: { id: string }) {
        return repository.findOneBy({ id });
    },

    findUser(query: FindOptionsWhere<User>): Promise<IDatabaseUser | null> {
        return repository.findOneBy({ deletedAt: undefined, ...query });
    },

    createUser(user: any): Promise<InsertResult> {
        return repository.insert(user);
    },

    updateUser(id: string, updatedData: any): Promise<UpdateResult> {
        return repository.update({ id }, updatedData);
    },

    deleteUser({ id }: { id: string }): Promise<UpdateResult> {
        return repository.update({ id }, { deletedAt: new Date() });
    },
};
