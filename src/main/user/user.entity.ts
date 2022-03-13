import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Business from '../business/business.entity';
import Customer from '../customer/customer.entity';
import Role from '../role/role.entity';
import Wallet from '../wallet/wallet.entity';
import { StatusEnum } from '../../utils/status.enum';
import CashTransfer from '../cash-transfer/cash-transfer.entity';

@Entity()
class User extends BaseEntity {
  @AutoMap()
  @Column('nvarchar', { name: 'FirstName', length: 20, nullable: false })
  public firstName: string;

  @AutoMap()
  @Column('nvarchar', { name: 'LastName', length: 30, nullable: false })
  public lastName: string;

  @AutoMap()
  @Column('date', { name: 'DOB', nullable: false })
  public DOB: Date;

  @AutoMap()
  @Column('varchar', {
    name: 'Status',
    length: 20,
    nullable: false,
    default: StatusEnum.IN_ACTIVE,
  })
  public status: string;

  @AutoMap()
  @Column('varchar', {
    name: 'Username',
    length: 100,
    nullable: false,
    unique: true,
  })
  public username: string;

  @Column('varchar', { name: 'Password', nullable: false })
  public password: string;

  @AutoMap()
  @Column('varchar', {
    name: 'PhoneNumber',
    length: 15,
    unique: true,
    nullable: false,
  })
  public phoneNumber: string;

  @Column('boolean', { name: 'PhoneNumberConfirmed', default: false })
  public phoneNumberConfirmed: boolean;

  @Column('integer', {
    name: 'PhoneNumberVerifyCode',
    default: null,
    nullable: true,
  })
  public phoneNumberVerifyCode: number;

  @Column('datetime', {
    name: 'PhoneNumberVerifyCodeExpire',
    default: null,
    nullable: true,
  })
  public phoneNumberVerifyCodeExpire: Date;

  @AutoMap()
  @Column('varchar', {
    name: 'Email',
    length: 100,
    nullable: false,
    unique: true,
  })
  public email: string;

  @AutoMap()
  @Column('varchar', { name: 'Address', nullable: false })
  public address: string;

  @AutoMap()
  @Column('varchar', { name: 'Avatar', nullable: false })
  public avatar: string;

  @Column({ name: 'RefreshToken', nullable: true })
  public refreshToken: string;

  @AutoMap({ typeFn: () => Customer })
  @OneToOne(() => Customer, (customer) => customer.user, {
    onDelete: 'CASCADE',
  })
  public customer: Customer;

  @AutoMap({ typeFn: () => Business })
  @OneToOne(() => Business, (business) => business.user, {
    onDelete: 'CASCADE',
  })
  public business: Business;

  @OneToOne(() => Wallet, (wallet) => wallet.user, { onDelete: 'CASCADE' })
  public wallet: Wallet;

  @AutoMap({ typeFn: () => Role })
  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  public role: Role;

  @OneToMany(() => CashTransfer, (cashTransfer) => cashTransfer.user)
  public cashTransfers: CashTransfer[];
}

export default User;
