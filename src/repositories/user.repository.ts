import { FindOptionsWhere, IsNull, UpdateResult } from "typeorm";

import { User } from "../entities/user.entity";
import { Account } from "../entities/account.entity";

import { ICreateUser, IUpdateUser } from "../interfaces/user.interface";

import AppDataSource from "../services/database.service";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
    getUserById({ id }: { id: string }) {
        return repository.createQueryBuilder('user')
            .leftJoinAndSelect('user.account', 'account')
            .select([
                'user.id',
                'user.name',
                'user.profilePicture',
                'account.agency',
                'account.accountNumber',
            ])
            .where('user.id = :id', { id })
            .getOne();
    },

    listUsers() {
        return repository.find({
            where: { deletedAt: IsNull() },
            select: ['id', 'name', 'profilePicture'],
        });
    },

    createUser({ cpf, name, email, address, password }: ICreateUser) {
        return repository.manager.transaction(async (transaction) => {
            const account = new Account();
            const insertedAccount = await transaction.save(account);

            const user = new User();
            user.cpf = cpf;
            user.name = name;
            user.email = email;
            user.address = address;
            user.password = password;

            user.account = account;

            const insertedUser = await transaction.save(user);

            account.user = insertedUser;

            await transaction.save(account);

            return { user: insertedUser, account: insertedAccount };
        });
    },

    updateUser({ id, address, email, password, profilePicture }: IUpdateUser) {
        return repository.update({ id }, { address, email, password, profilePicture });
    },

    deleteUser({ id }: { id: string }) {
        return repository.update({ id }, { deletedAt: new Date() });
    },

    findUser(query: FindOptionsWhere<User>) {
        return repository.findOneBy({ deletedAt: undefined, ...query });
    },
};
