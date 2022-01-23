import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Parking from '../parking/parking.entity';
import PriceListDetail from '../price-list-detail/price-list-detail.entity';

@Entity()
class PriceList extends BaseEntity {
  @Column('varchar', { name: 'Name', length: 100, nullable: false })
  public name: string;
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
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
