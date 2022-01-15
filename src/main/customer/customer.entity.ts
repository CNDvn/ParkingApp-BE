import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Car from '../car/car.entity';
import CustomerPromotion from '../customer-promotion/customer-promotion.entity';
import User from '../user/user.entity';
import Wallet from '../wallet/wallet.entity';

@Entity()
class Customer extends BaseEntity {
  @Column({ name: 'FirstName' })
  public firstName: string;
  @Column({ name: 'LastName' })
  public lastName: string;
  @Column('date', { name: 'DOB' })
  public DOB: Date;
  @Column({ name: 'PhoneNumber' })
  public phoneNumber: string;
  @Column({ name: 'Address' })
  public address: string;
  @Column({ name: 'Status' })
  public status: string;
  @Column({ name: 'Level' })
  public level: string;
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
  @OneToMany(() => Wallet, (wallet) => wallet.customer)
  public wallet: Wallet[];
}

export default Customer;
