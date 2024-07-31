import {
    Entity,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Account } from './account.entity';
import { Transaction } from './transaction.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 255, nullable: false })
    name: string;

    @Column("varchar", { length: 255, nullable: false, unique: true })
    email: string;
    
    @Column("varchar", { length: 14, nullable: false, unique: true })
    cpf: string;
    
    @Column("varchar", { length: 255, nullable: false, unique: true })
    password: string;

    @Column('text')
    address: string;

    @Column('text', { nullable: true, unique: true })
    profilePicture: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deletedAt: Date;

    @OneToOne(() => Account, banking => banking.user)
    @JoinColumn()
    account: Account;

    @OneToMany(() => Transaction, transaction => transaction.senderUser)
    sentTransactions: Transaction[];

    @OneToMany(() => Transaction, transaction => transaction.receiverUser)
    receivedTransactions: Transaction[];
}
