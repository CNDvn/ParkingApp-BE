import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Customer from '../customer/customer.entity';
import Image from '../image/image.entity';
import TypeCar from '../type-car/type-car.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
class Car extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'NPlates', length: 15, nullable: false })
  public nPlates: string;

  @AutoMap()
  @Column('varchar', { name: 'Brand', length: 50, nullable: false })
  public brand: string;

  @AutoMap()
  @Column('varchar', { name: 'Color', length: 20, nullable: false })
  public color: string;

  @AutoMap()
  @Column('varchar', { name: 'Model', length: 20, nullable: false })
  public modelCode: string;

  @AutoMap()
  @Column('varchar', {
    name: 'Status',
    length: 20,
    nullable: false,
    default: 'active',
  })
  public status: string;

  @AutoMap({ typeFn: () => Customer })
  @ManyToOne(() => Customer, (customer) => customer.cars)
  @JoinColumn({ name: 'CustomerId' })
  public customer: Customer;

  @AutoMap({ typeFn: () => TypeCar })
  @ManyToOne(() => TypeCar, (typeCar) => typeCar.cars)
  @JoinColumn({ name: 'TypeCarId' })
  public typeCar: TypeCar;

  @OneToMany(() => Booking, (booking) => booking.car)
  public bookings: Booking[];

  @AutoMap({ typeFn: () => Image })
  @OneToMany(() => Image, (image) => image.car)
  public images: Image[];
}

export default Car;
