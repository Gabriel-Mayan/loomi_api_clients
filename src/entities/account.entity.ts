import { 
  Entity, 
  Column, 
  OneToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  PrimaryGeneratedColumn,
  BeforeInsert, 
} from 'typeorm';

import { User } from './user.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar", { length: 4, nullable: false, default: "0001" })
  agency: string;

  @Column("varchar", { length: 12, nullable: false, unique: true })
  accountNumber: string;

  @Column("integer", { default: 0 })
  accountValue: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deletedAt: Date;
  
  @OneToOne(() => User, user => user.account)
  @JoinColumn()
  user: User;
  
  @BeforeInsert()
  generateAccountNumber() {
    this.accountNumber = this.generateRandomAccountNumber();
  }

  private generateRandomAccountNumber(): string {
    const accountNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    const checkDigit = this.calculateCheckDigit(accountNumber);
    
    return `${accountNumber}-${checkDigit}`;
  }

  private calculateCheckDigit(accountNumber: string): number {
    const weights = [2, 1];
    const sum = this.calculateWeightedSum(accountNumber, weights);
    return this.calculateMod10CheckDigit(sum);
  }

  private calculateWeightedSum(accountNumber: string, weights: number[]): number {
    return accountNumber
      .split('')
      .reverse()
      .reduce((sum, digit, index) => {
        const weight = weights[index % weights.length];
        return sum + parseInt(digit, 10) * weight;
      }, 0);
  }

  private calculateMod10CheckDigit(sum: number): number {
    const remainder = sum % 10;
    return remainder === 0 ? 0 : 10 - remainder;
  }
}