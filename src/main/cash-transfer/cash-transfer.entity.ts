import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Transaction from '../transaction/transaction.entity';
import User from '../user/user.entity';

@Entity()
class CashTransfer extends BaseEntity {
  @Column('decimal', { name: 'Amount', nullable: false })
  public amount: number;

  @Column('varchar', { name: 'BankCode', nullable: false })
  bankCode: string;

  @Column('varchar', { name: 'BankTranNo', nullable: false })
  bankTranNo: string;

  @Column('varchar', { name: 'CardType', nullable: false })
  cardType: string;

  @Column('varchar', { name: 'OrderInfo', nullable: false })
  orderInfo: string;

  @Column('varchar', { name: 'PayDate', nullable: false })
  payDate: string;

  @Column('varchar', { name: 'TransactionNo', nullable: false })
  transactionNo: string;

  @Column('varchar', { name: 'TransactionStatus', nullable: false })
  transactionStatus: string;

  @OneToOne(() => Transaction, (transaction) => transaction.cashTransfer)
  public transaction: Transaction;

  @ManyToOne(() => User, (user) => user.cashTransfers)
  @JoinColumn({ name: 'UserId' })
  public user: User;
}

export default CashTransfer;
