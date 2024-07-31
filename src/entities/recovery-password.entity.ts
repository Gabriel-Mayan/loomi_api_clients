import {
    Entity,
    BaseEntity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class RecoveryPassword extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "timestamp" })
    expiresIn: Date;

    @Column({ type: "boolean", default: 0 })
    mailSent: boolean;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false, eager: true })
    @JoinColumn()
    user: User;
}