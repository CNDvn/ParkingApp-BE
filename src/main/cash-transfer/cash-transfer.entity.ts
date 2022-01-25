import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import TransferType from '../tranfer-type/transfer-type.entity';
import Transaction from '../transaction/transaction.entity';

@Entity()
class CashTransfer extends BaseEntity {
  @Column('int', { name: 'Amount', nullable: false })
  public amount: number;

  @Column('datetime', { name: 'Date', nullable: false, default: () => 'now()' })
  public date: Date;

  @Column('varchar', { name: 'Code' })
  public code: string;

  @Column('varchar', { name: 'CardHolder' })
  public cardHolder: string;

  @ManyToOne(() => TransferType, (transferType) => transferType.cashTransfers)
  @JoinColumn({ name: 'TransferTypeId' })
  public transferType: TransferType;

  @OneToMany(() => Transaction, (transaction) => transaction.cashTransfer)
  public transactions: Transaction[];
}

export default CashTransfer;
