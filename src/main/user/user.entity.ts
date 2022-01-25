import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Business from '../business/business.entity';
import Customer from '../customer/customer.entity';
import Role from '../role/role.entity';
import Wallet from '../wallet/wallet.entity';

@Entity()
class User extends BaseEntity {
  @Column('nvarchar', { name: 'FirstName', length: 20, nullable: false })
  public firstName: string;

  @Column('nvarchar', { name: 'LastName', length: 30, nullable: false })
  public lastName: string;

  @Column('date', { name: 'DOB', nullable: false })
  public DOB: Date;

  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;

  @Column('varchar', {
    name: 'Username',
    length: 100,
    nullable: false,
    unique: true,
  })
  public username: string;

  @Column('varchar', { name: 'Password', nullable: false })
  public password: string;

  @Column('varchar', {
    name: 'PhoneNumber',
    length: 15,
    unique: true,
    nullable: false,
  })
  public phoneNumber: string;

  @Column('varchar', {
    name: 'Email',
    length: 100,
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({ name: 'RefreshToken' })
  public refreshToken: string;

  @OneToOne(() => Customer, (customer) => customer.user)
  public customer: Customer;

  @OneToOne(() => Business, (business) => business.user)
  public business: Business;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  public wallet: Wallet;

  @ManyToOne(() => Role, (role) => role.users)
  public role: Role;
}

export default User;
