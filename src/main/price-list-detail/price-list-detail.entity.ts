import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import PriceList from '../price-list/price-list.entity';
import TypeCar from '../type-car/type-car.entity';

@Entity()
class PriceListDetail extends BaseEntity {
  @Column('int', { name: 'Price', nullable: false })
  public price: number;

  @Column('int', { name: 'Deposit', default: 0, nullable: false })
  public deposit: number;

  @Column('int', { name: 'TimePercent' })
  public timePercent: number;

  @ManyToOne(() => TypeCar, (typeCar) => typeCar.priceListDetails)
  @JoinColumn({ name: 'TypeCarId' })
  public typeCar: TypeCar;

  @ManyToOne(() => PriceList, (priceList) => priceList.priceListDetails)
  @JoinColumn({ name: 'PriceListId' })
  public priceList: PriceList;
}

export default PriceListDetail;
