import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Transaction from '../transaction/transaction.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class Payment extends BaseEntity {
  @AutoMap()
  @Column('decimal', {
    name: 'Amount',
    nullable: false,
    precision: 12,
    scale: 3,
  })
  public amount: number;

  @AutoMap()
  @Column('datetime', { name: 'EndTime', default: () => `now()` })
  public endTime: Date;

  @AutoMap()
  @Column('varchar', { name: 'Type', nullable: false })
  public type: string;

  @OneToOne(() => Transaction, (transaction) => transaction.payment)
  public transaction: Transaction;

  @OneToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn({ name: 'PaymentId' })
  public booking: Booking;
}

export default Payment;
