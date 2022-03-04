import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import PriceListDetail from '../price-list-detail/price-list-detail.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class TypeCar extends BaseEntity {
  @AutoMap()
  @Column('nvarchar', { name: 'Name', length: 100, nullable: false })
  public name: string;

  @OneToMany(() => Car, (car) => car.typeCar)
  public cars: Car[];

  @OneToMany(
    () => PriceListDetail,
    (priceListDetail) => priceListDetail.typeCar,
  )
  public priceListDetails: PriceListDetail[];
}

export default TypeCar;
