import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Parking from '../parking/parking.entity';

@Entity()
class ParkingSlot extends BaseEntity {
  @Column({ name: 'LocationName' })
  public locationName: string;
  @Column({ name: 'Status' })
  public status: string;
  @OneToMany(() => Booking, (booking) => booking.parkingSlot)
  public booking: Booking[];
  @ManyToOne(() => Parking, (parking) => parking.parkingSlot)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
}

export default ParkingSlot;
