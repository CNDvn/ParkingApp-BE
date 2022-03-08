import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import PriceList from '../price-list/price-list.entity';
import TypeCar from '../type-car/type-car.entity';

@Entity()
class PriceListDetail extends BaseEntity {
  @AutoMap()
  @Column('decimal', {
    name: 'Price',
    nullable: false,
    precision: 12,
    scale: 3,
  })
  public price: number;

  @AutoMap({ typeFn: () => TypeCar })
  @ManyToOne(() => TypeCar, (typeCar) => typeCar.priceListDetails)
  @JoinColumn({ name: 'TypeCarId' })
  public typeCar: TypeCar;

  @ManyToOne(() => PriceList, (priceList) => priceList.priceListDetails)
  @JoinColumn({ name: 'PriceListId' })
  public priceList: PriceList;
}

export default PriceListDetail;
