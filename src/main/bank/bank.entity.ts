import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Card from '../card/card.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class Bank extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'Name', nullable: false, length: 100 })
  public name: string;

  @AutoMap()
  @Column('varchar', { name: 'BankId', nullable: false, length: 100 })
  public bankCode: string;

  @OneToMany(() => Card, (card) => card.bank)
  public cards: Card[];
}

export default Bank;
