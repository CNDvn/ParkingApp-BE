import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import Parking from '../parking/parking.entity';

@Entity()
class Image extends BaseEntity {
  @Column('varchar', { name: 'Url', nullable: false })
  public url: string;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: 'CarId' })
  public car: Car;

  @ManyToOne(() => Parking, (parking) => parking.images)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
}
export default Image;
