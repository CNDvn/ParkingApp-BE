import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Transaction from '../transaction/transaction.entity';

@Entity()
class Payment extends BaseEntity {
  @Column({ name: 'Amount' })
  public amount: string;
  @Column({ name: 'Type' })
  public type: string;
  @OneToMany(() => Transaction, (transaction) => transaction.payment)
  public transaction: Transaction[];
  @ManyToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn({ name: 'PaymentId' })
  public booking: Booking;
}

export default Payment;
