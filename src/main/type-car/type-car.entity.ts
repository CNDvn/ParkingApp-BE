import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import PriceListDetail from '../price-list-detail/price-list-detail.entity';

@Entity()
class TypeCar extends BaseEntity {
  @Column({ name: 'Name' })
  public name: string;
  @OneToMany(() => Car, (car) => car.typeCar)
  public car: Car[];
  @OneToMany(
    () => PriceListDetail,
    (priceListDetail) => priceListDetail.typeCar,
  )
  public priceListDetail: PriceListDetail[];
}

export default TypeCar;
