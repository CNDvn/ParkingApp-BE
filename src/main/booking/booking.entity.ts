import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';
import Parking from '../parking/parking.entity';
import Payment from '../payment/payment.entity';
import Service from '../service/service.entity';

@Entity()
class Booking extends BaseEntity {
  @Column('datetime', {
    name: 'StartTime',
    default: () => `now()`,
    nullable: false,
  })
  public startTime: Date;

  @Column('datetime', { name: 'EndTime' })
  public endTime: Date;

  @Column('datetime', { name: 'ReservationTime' })
  public reservationTime: Date;

  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @Column('int', { name: 'Deposit' })
  public deposit: number;

  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({ name: 'ServiceId' })
  public service: Service;

  @ManyToOne(() => Parking, (parking) => parking.bookings)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;

  @ManyToOne(() => ParkingSlot, (parkingSlot) => parkingSlot.bookings)
  @JoinColumn({ name: 'ParkingSlotId' })
  public parkingSlot: ParkingSlot;

  @OneToMany(() => Payment, (payment) => payment.booking)
  public payments: Payment[];

  @ManyToOne(() => Car, (car) => car.bookings)
  @JoinColumn({ name: 'CarId' })
  public car: Car;
}

export default Booking;
