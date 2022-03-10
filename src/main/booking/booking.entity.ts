import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';
import Parking from '../parking/parking.entity';
import Payment from '../payment/payment.entity';
import Service from '../service/service.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class Booking extends BaseEntity {
  @AutoMap()
  @Column('datetime', {
    name: 'StartTime',
    default: () => `now()`,
    nullable: false,
  })
  public startTime: Date;

  @AutoMap()
  @Column('datetime', {
    name: 'CheckinTime',
    nullable: true,
  })
  public checkinTime: Date;

  @AutoMap()
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @AutoMap()
  @Column('decimal', {
    name: 'Price',
    nullable: false,
    precision: 12,
    scale: 3,
  })
  public price: number;

  @AutoMap({ typeFn: () => Service })
  @ManyToOne(() => Service, (service) => service.bookings)
  @JoinColumn({ name: 'ServiceId' })
  public service: Service;

  @AutoMap({ typeFn: () => Parking })
  @ManyToOne(() => Parking, (parking) => parking.bookings)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;

  @AutoMap({ typeFn: () => ParkingSlot })
  @ManyToOne(() => ParkingSlot, (parkingSlot) => parkingSlot.bookings)
  @JoinColumn({ name: 'ParkingSlotId' })
  public parkingSlot: ParkingSlot;

  @AutoMap({ typeFn: () => Payment })
  @OneToOne(() => Payment, (payment) => payment.booking)
  public payment: Payment;

  @AutoMap({ typeFn: () => Car })
  @ManyToOne(() => Car, (car) => car.bookings)
  @JoinColumn({ name: 'CarId' })
  public car: Car;
}

export default Booking;
