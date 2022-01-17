import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Admin from '../admin/admin.entity';
import Business from '../business/business.entity';
import Customer from '../customer/customer.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  public id: string;
  @Column({ name: 'Username' })
  public username: string;
  @Column({ name: 'Password' })
  public password: string;
  @OneToOne(() => Customer, (customer) => customer.user)
  public customer: Customer;
  @OneToOne(() => Business, (business) => business.user)
  public business: Business;
  @OneToOne(() => Admin, (admin) => admin.user)
  public admin: Admin;
}

export default User;
