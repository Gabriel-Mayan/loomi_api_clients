import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Banking } from './banking.entity';
import { Transaction } from './transaction.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 255, nullable: false })
    name: string;

    @Column("varchar", { length: 255, nullable: false, unique: true })
    email: string;

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

    @OneToOne(() => Banking, banking => banking.user)
    @JoinColumn()
    banking: Banking;
  
    @OneToMany(() => Transaction, transaction => transaction.senderUser)
    sentTransactions: Transaction[];
  
    @OneToMany(() => Transaction, transaction => transaction.receiverUser)
    receivedTransactions: Transaction[];
}
