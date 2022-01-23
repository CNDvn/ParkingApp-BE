import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import CustomerPromotion from '../customer-promotion/customer-promotion.entity';
import User from '../user/user.entity';
import Wallet from '../wallet/wallet.entity';

@Entity()
class Customer extends BaseEntity {
  @Column('varchar', { name: 'Address', nullable: false })
  public address: string;
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
  @Column('int', { name: 'Level', nullable: false, default: 0 })
  public level: number;
  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn({ name: 'UserId' })
  public user: User;
  @OneToMany(
    () => CustomerPromotion,
    (customerPromotion) => customerPromotion.customer,
  )
  public customerPromotion: CustomerPromotion[];
  @OneToMany(() => Car, (car) => car.customer)
  public car: Car[];
}

export default Customer;
