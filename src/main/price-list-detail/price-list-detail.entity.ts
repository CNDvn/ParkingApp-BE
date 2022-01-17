import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import PriceList from '../price-list/price-list.entity';
import TypeCar from '../type-car/type-car.entity';

@Entity()
class PriceListDetail extends BaseEntity {
  @Column({ name: 'PriceTwoHours' })
  public priceTwoHours: number;
  @Column({ name: 'Price' })
  public price: number;
  @ManyToOne(() => TypeCar, (typeCar) => typeCar.priceListDetail)
  @JoinColumn({ name: 'TypeCarId' })
  public typeCar: TypeCar;
  @ManyToOne(() => PriceList, (priceList) => priceList.priceListDetail)
  @JoinColumn({ name: 'PriceListId' })
  public priceList: PriceList;
}

export default PriceListDetail;
