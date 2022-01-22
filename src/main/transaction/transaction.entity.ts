import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Payment from '../payment/payment.entity';
import Wallet from '../wallet/wallet.entity';

@Entity()
class Transaction extends BaseEntity {
  @Column('datetime', { name: 'Date', nullable: false, default: () => `now()` })
  public date: Date;
  @Column('int', { name: 'Amount', nullable: false })
  public amount: number;
  @ManyToOne(() => Wallet, (wallet) => wallet.transaction)
  @JoinColumn({ name: 'WalletId' })
  public wallet: Wallet;
  @ManyToOne(() => Payment, (payment) => payment.transaction)
  @JoinColumn({ name: 'PaymentId' })
  public payment: Payment;
}
export default Transaction;
