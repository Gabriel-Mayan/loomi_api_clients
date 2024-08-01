import { FindOptionsWhere, IsNull, UpdateResult } from "typeorm";

import { User } from "../entities/user.entity";
import { Account } from "../entities/account.entity";

import { IDatabaseUser } from "../interfaces/user.interface";

import AppDataSource from "../services/database.service";

const repository = AppDataSource.getRepository(User);

export const UserRepository = {
    getUserById({ id }: { id: string }) {
        return repository.findOne({ 
            where: { id },
            select: ['id', 'name', 'email']
        });
    },
    
    listUsers() {
        return repository.find({
            where: { deletedAt: IsNull() },
            select: ['id', 'name'],
          });
    },
    
    createUser({ cpf, name, email, address, password }: { cpf: string, name: string, email: string, address: string, password: string }) {
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

    updateUser({ id, address, email, password }: { id: string, email?: string, address?: string, password?: string }): Promise<UpdateResult> {
        return repository.update({ id }, { address, email, password });
    },

    deleteUser({ id }: { id: string }): Promise<UpdateResult> {
        return repository.update({ id }, { deletedAt: new Date() });
    },

    findUser(query: FindOptionsWhere<User>): Promise<IDatabaseUser | null> {
        return repository.findOneBy({ deletedAt: undefined, ...query });
    },
};
