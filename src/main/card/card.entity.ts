import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Bank from '../bank/bank.entity';
import Transaction from '../transaction/transaction.entity';

@Entity()
class Card extends BaseEntity {
  @Column('int', { name: 'Amount', nullable: false })
  public amount: number;

  @Column('datetime', { name: 'Date', nullable: false, default: () => 'now()' })
  public date: Date;

  @Column('varchar', { name: 'Code' })
  public code: string;

  @Column('varchar', { name: 'CardHolder' })
  public cardHolder: string;

  @ManyToOne(() => Bank, (bank) => bank.cards)
  @JoinColumn({ name: 'BankId' })
  public bank: Bank;

  @OneToMany(() => Transaction, (transaction) => transaction.card)
  public transactions: Transaction[];
}

export default Card;
