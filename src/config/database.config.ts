import "reflect-metadata";
import { config } from "dotenv";
import { DataSourceOptions } from "typeorm";
import { Account } from "../entities/account.entity";
import { Transaction } from "../entities/transaction.entity";
import { User } from "../entities/user.entity";
import { RecoveryPassword } from "../entities/recovery-password.entity";

config();

export const databaseConfig: DataSourceOptions = {
    type: process.env.DB_CLIENT as any,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [Account, Transaction, User, RecoveryPassword],
    migrations: [],
    subscribers: [],
};
