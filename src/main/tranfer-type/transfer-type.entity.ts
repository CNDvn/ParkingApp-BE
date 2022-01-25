import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import CashTransfer from '../cash-transfer/cash-transfer.entity';

@Entity()
class TransferType extends BaseEntity {
  @Column('varchar', { name: 'Name', nullable: false, length: 100 })
  public name: string;

  @OneToMany(() => CashTransfer, (cashTransfer) => cashTransfer.transferType)
  public cashTransfers: CashTransfer[];
}

export default TransferType;
