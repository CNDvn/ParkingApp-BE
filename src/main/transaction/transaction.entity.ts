import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
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

  @ManyToOne(() => Wallet, (wallet) => wallet.transactionsTo)
  @JoinColumn({ name: 'ToWalletId' })
  public walletTo: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactionsForm)
  @JoinColumn({ name: 'FormWalletId' })
  public walletForm: Wallet;

  @OneToOne(() => Payment, (payment) => payment.transaction)
  @JoinColumn({ name: 'PaymentId' })
  public payment: Payment;

  @OneToOne(() => CashTransfer, (cashTransfer) => cashTransfer.transaction)
  @JoinColumn({ name: 'CashTransferId' })
  public cashTransfer: CashTransfer;
}
export default Transaction;
