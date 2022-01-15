import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';
import Parking from '../parking/parking.entity';
import Payment from '../payment/payment.entity';
import Service from '../service/service.entity';

@Entity()
class Booking extends BaseEntity {
  @Column('time', { name: 'StartTime' })
  public startTime: Date;
  @Column('time', { name: 'EndTime' })
  public endTime: Date;
  @Column({ name: 'Status' })
  public status: string;
  @ManyToOne(() => Service, (service) => service.booking)
  @JoinColumn({ name: 'ServiceId' })
  public service: Service;
  @ManyToOne(() => Parking, (parking) => parking.booking)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
  @ManyToOne(() => ParkingSlot, (parkingSlot) => parkingSlot.booking)
  @JoinColumn({ name: 'ParkingSlotId' })
  public parkingSlot: ParkingSlot;
  @OneToMany(() => Payment, (payment) => payment.booking)
  public payment: Payment[];
  @ManyToOne(() => Car, (car) => car.booking)
  @JoinColumn({ name: 'CarId' })
  public car: Car;
}

export default Booking;
