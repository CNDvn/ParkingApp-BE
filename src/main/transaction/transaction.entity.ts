import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import CashTransfer from '../cash-transfer/cash-transfer.entity';
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
  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  @JoinColumn({ name: 'WalletId' })
  public wallet: Wallet;
  @ManyToOne(() => Payment, (payment) => payment.transactions)
  @JoinColumn({ name: 'PaymentId' })
  public payment: Payment;
  @ManyToOne(() => CashTransfer, (cashTransfer) => cashTransfer.transactions)
  @JoinColumn({ name: 'CashTransferId' })
  public cashTransfer = CashTransfer;
}
export default Transaction;
