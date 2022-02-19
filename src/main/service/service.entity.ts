import { StatusEnum } from 'src/utils/status.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Parking from '../parking/parking.entity';

@Entity()
class Service extends BaseEntity {
  @Column('nvarchar', { name: 'Name', length: 100, nullable: false })
  public name: string;

  @Column('text', { name: 'Description' })
  public description: string;

  @Column('int', { name: 'Price', nullable: false })
  public price: number;

  @Column('varchar', {
    name: 'Status',
    length: 20,
    nullable: false,
    default: StatusEnum.ACTIVE,
  })
  public status: string;

  @ManyToOne(() => Parking, (parking) => parking.services)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;

  @OneToMany(() => Booking, (booking) => booking.service)
  public bookings: Booking[];
}
export default Service;
