import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Booking from '../booking/booking.entity';
import Customer from '../customer/customer.entity';
import TypeCar from '../type-car/type-car.entity';

@Entity()
class Car extends BaseEntity {
  @Column({ name: 'NPlates' })
  nPlates: string;
  @Column({ name: 'Brand' })
  public brand: string;
  @Column({ name: 'Color' })
  public color: string;
  @Column({ name: 'Model' })
  public modelCode: string;
  @Column({ name: 'Status' })
  public status: string;
  @ManyToOne(() => Customer, (customer) => customer.car)
  @JoinColumn({ name: 'CustomerId' })
  public customer: Customer;
  @ManyToOne(() => TypeCar, (typeCar) => typeCar.car)
  @JoinColumn({ name: 'TypeCarId' })
  public typeCar: TypeCar;
  @OneToMany(() => Booking, (booking) => booking.car)
  public booking: Booking[];
}

export default Car;
