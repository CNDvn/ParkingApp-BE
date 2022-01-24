import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Customer from '../customer/customer.entity';
import Image from '../image/image.entity';
import TypeCar from '../type-car/type-car.entity';

@Entity()
class Car extends BaseEntity {
  @Column('varchar', { name: 'NPlates', length: 15, nullable: false })
  nPlates: string;
  @Column('varchar', { name: 'Brand', length: 50, nullable: false })
  public brand: string;
  @Column('varchar', { name: 'Color', length: 20, nullable: false })
  public color: string;
  @Column('varchar', { name: 'Model', length: 20, nullable: false })
  public modelCode: string;
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
  @ManyToOne(() => Customer, (customer) => customer.cars)
  @JoinColumn({ name: 'CustomerId' })
  public customer: Customer;
  @ManyToOne(() => TypeCar, (typeCar) => typeCar.cars)
  @JoinColumn({ name: 'TypeCarId' })
  public typeCar: TypeCar;
  @OneToMany(() => Booking, (booking) => booking.car)
  public bookings: Booking[];
  @OneToMany(() => Image, (image) => image.car)
  public images: Image[];
}

export default Car;
