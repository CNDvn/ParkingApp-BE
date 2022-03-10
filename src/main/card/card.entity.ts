import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Bank from '../bank/bank.entity';
import Transaction from '../transaction/transaction.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class Card extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'DateValidFrom', nullable: false })
  public dateValidFrom: string;

  @AutoMap()
  @Column('varchar', { name: 'Code' })
  public cardNumber: string;

  @AutoMap()
  @Column('varchar', { name: 'CardHolder' })
  public cardHolder: string;

  @AutoMap({ typeFn: () => Bank })
  @ManyToOne(() => Bank, (bank) => bank.cards)
  @JoinColumn({ name: 'BankId' })
  public bank: Bank;

  @OneToMany(() => Transaction, (transaction) => transaction.card)
  public transactions: Transaction[];
}

export default Card;
