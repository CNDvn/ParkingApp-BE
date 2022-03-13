import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import CashTransfer from '../cash-transfer/cash-transfer.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class Bank extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'Name', nullable: false, length: 100 })
  public name: string;

  @AutoMap()
  @Column('varchar', { name: 'BankCode', nullable: false, length: 10 })
  public bankCode: string;
}

export default Bank;
