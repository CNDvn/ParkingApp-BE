import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Transaction from '../transaction/transaction.entity';
import User from '../user/user.entity';

@Entity()
class Wallet extends BaseEntity {
  @AutoMap()
  @Column('decimal', {
    name: 'CurrentBalance',
    default: 0,
    nullable: false,
    precision: 12,
    scale: 3,
  })
  public currentBalance: number;

  @AutoMap()
  @Column('datetime', { name: 'ExpiredTime' })
  public expiredTime: Date;

  @AutoMap()
  @Column('datetime', { name: 'CreatedTime', default: () => 'now()' })
  public createdTime: Date;

  @AutoMap({ typeFn: () => User })
  @OneToOne(() => User, (user) => user.wallet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserId' })
  public user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.walletTo)
  public transactionsTo: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.walletForm)
  public transactionsForm: Transaction[];
}

export default Wallet;
