import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import Parking from '../parking/parking.entity';

@Entity()
class Image extends BaseEntity {
  @Column('varchar', { name: 'Title' })
  public title: string;
  @Column('varchar', { name: 'UrlViewer', nullable: false })
  public urlViewer: string;
  @Column('varchar', { name: 'Url' })
  public url: string;
  @Column('varchar', { name: 'DisplayUrl' })
  public displayUrl: string;
  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: 'CarId' })
  public car: Car;

  @ManyToOne(() => Parking, (parking) => parking.images)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
}
export default Image;
