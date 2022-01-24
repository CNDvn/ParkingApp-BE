import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Transaction from '../transaction/transaction.entity';
import User from '../user/user.entity';

@Entity()
class Wallet extends BaseEntity {
  @Column('int', { name: 'CurrentBalance', default: 0, nullable: false })
  public currentBalance: number;
  @Column('datetime', { name: 'ExpiredTime' })
  public expiredTime: Date;
  @Column('datetime', { name: 'CreatedTime', default: () => 'now()' })
  public createdTime: Date;
  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn({ name: 'UserId' })
  public user: User;
  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  public transactions: Transaction[];
}

export default Wallet;
