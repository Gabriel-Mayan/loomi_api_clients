import "reflect-metadata";
import { config } from "dotenv";
import { DataSourceOptions } from "typeorm";
import { Banking } from "src/entities/banking.entity";
import { Transaction } from "src/entities/transaction.entity";
import { User } from "src/entities/user.entity";

config();

export const databaseConfig: DataSourceOptions = {
    type: process.env.DB_CLIENT as any,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Banking, Transaction, User],
    migrations: [],
    subscribers: [],
};
