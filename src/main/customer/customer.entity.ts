import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import CustomerPromotion from '../customer-promotion/customer-promotion.entity';
import User from '../user/user.entity';

@Entity()
class Customer extends BaseEntity {
  @AutoMap()
  @Column('int', { name: 'Level', nullable: false, default: 0 })
  public level: number;

  @OneToOne(() => User, (user) => user.customer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'UserId' })
  public user: User;

  @OneToMany(
    () => CustomerPromotion,
    (customerPromotion) => customerPromotion.customer,
  )
  public customerPromotions: CustomerPromotion[];

  @OneToMany(() => Car, (car) => car.customer)
  public cars: Car[];
}

export default Customer;
