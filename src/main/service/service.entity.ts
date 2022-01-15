import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Parking from '../parking/parking.entity';

@Entity()
class Service extends BaseEntity {
  @Column({ name: 'Name' })
  public name: string;
  @Column({ name: 'Description' })
  public description: string;
  @Column({ name: 'Price' })
  public price: number;
  @Column({ name: 'Status' })
  public status: string;
  @ManyToOne(() => Parking, (parking) => parking.service)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
  @OneToMany(() => Booking, (booking) => booking.service)
  public booking: Booking[];
}
export default Service;
