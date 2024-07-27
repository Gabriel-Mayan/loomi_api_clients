import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, Check, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('transactions')
@Check(`"senderUserId" <> "receiverUserId"`)
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  senderUserId: string;

  @Column('uuid')
  receiverUserId: string;

  @Column('decimal')
  amount: number;

  @Column('text')
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
  
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'senderUserId' })
  senderUser: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'receiverUserId' })
  receiverUser: User;
}
