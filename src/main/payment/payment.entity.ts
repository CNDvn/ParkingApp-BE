import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Transaction from '../transaction/transaction.entity';

@Entity()
class Payment extends BaseEntity {
  @Column('int', { name: 'Amount', nullable: false })
  public amount: string;
  @Column('varchar', { name: 'Type', nullable: false })
  public type: string;
  @OneToMany(() => Transaction, (transaction) => transaction.payment)
  public transactions: Transaction[];
  @ManyToOne(() => Booking, (booking) => booking.payments)
  @JoinColumn({ name: 'PaymentId' })
  public booking: Booking;
}

export default Payment;
