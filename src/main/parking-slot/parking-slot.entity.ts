import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Parking from '../parking/parking.entity';

@Entity()
class ParkingSlot extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'LocationName', length: 10, nullable: false })
  public locationName: string;

  @AutoMap()
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @AutoMap({ typeFn: () => Booking })
  @OneToMany(() => Booking, (booking) => booking.parkingSlot)
  public bookings: Booking[];

  @ManyToOne(() => Parking, (parking) => parking.parkingSlots)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
}

export default ParkingSlot;
