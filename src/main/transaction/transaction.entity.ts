import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Card from '../card/card.entity';
import Payment from '../payment/payment.entity';
import Wallet from '../wallet/wallet.entity';

@Entity()
class Transaction extends BaseEntity {
  @Column('datetime', { name: 'Date', nullable: false, default: () => `now()` })
  public date: Date;

  @Column('int', { name: 'Amount', nullable: false })
  public amount: number;

  @Column('text', { name: 'Description', nullable: true })
  public description: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactionsTo)
  @JoinColumn({ name: 'ToWalletId' })
  public walletTo: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactionsForm)
  @JoinColumn({ name: 'FormWalletId' })
  public walletForm: Wallet;

  @OneToOne(() => Payment, (payment) => payment.transaction)
  @JoinColumn({ name: 'PaymentId' })
  public payment: Payment;

  @ManyToOne(() => Card, (card) => card.transactions)
  @JoinColumn({ name: 'CardId' })
  public card: Card;
}
export default Transaction;
