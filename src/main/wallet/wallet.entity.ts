import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Transaction from '../transaction/transaction.entity';
import User from '../user/user.entity';

@Entity()
class Wallet extends BaseEntity {
  @Column('int', { name: 'TotalPrice', default: 0, nullable: false })
  public totalPrice: number;
  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn({ name: 'UserId' })
  public user: User;
  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  public transaction: Transaction[];
}

export default Wallet;
