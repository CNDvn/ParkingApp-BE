import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Customer from '../customer/customer.entity';
import Transaction from '../transaction/transaction.entity';

@Entity()
class Wallet extends BaseEntity {
  @Column({ name: 'TotalPrice' })
  public totalPrice: number;
  @Column({ name: 'Name' })
  public name: string;
  @ManyToOne(() => Customer, (customer) => customer.wallet)
  @JoinColumn({ name: 'CustomerId' })
  public customer: Customer;
  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  public transaction: Transaction[];
}

export default Wallet;
