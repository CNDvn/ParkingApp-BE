import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Parking from '../parking/parking.entity';
import PriceListDetail from '../price-list-detail/price-list-detail.entity';

@Entity()
class PriceList extends BaseEntity {
  @Column({ name: 'Name' })
  public name: string;
  @OneToMany(
    () => PriceListDetail,
    (priceListDetail) => priceListDetail.priceList,
  )
  public priceListDetail: PriceListDetail[];
  @ManyToOne(() => Parking, (parking) => parking.priceList)
  @JoinColumn({ name: 'ParkingId' })
  public parking: Parking;
}
export default PriceList;
