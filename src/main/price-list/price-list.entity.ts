import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Parking from '../parking/parking.entity';
import PriceListDetail from '../price-list-detail/price-list-detail.entity';

@Entity()
class PriceList extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'Name', length: 100, nullable: false })
  public name: string;

  @AutoMap()
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @AutoMap({ typeFn: () => PriceListDetail })
  @OneToMany(
    () => PriceListDetail,
    (priceListDetail) => priceListDetail.priceList,
  )
  public priceListDetails: PriceListDetail[];

  // @AutoMap({ typeFn: () => Parking })
  @ManyToOne(() => Parking, (parking) => parking.priceLists)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
}
export default PriceList;
