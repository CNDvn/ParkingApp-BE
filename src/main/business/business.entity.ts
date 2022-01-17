import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Parking from '../parking/parking.entity';
import User from '../user/user.entity';

@Entity()
class Business extends BaseEntity {
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
  @Column({ name: 'EmailAddress' })
  public emailAddress: string;
  @Column({ name: 'Status' })
  public status: string;
  @OneToOne(() => User, (user) => user.business)
  @JoinColumn({ name: 'UserId' })
  public user: User;
  @OneToMany(() => Parking, (parking) => parking.business)
  public parking: Parking[];
}
export default Business;
