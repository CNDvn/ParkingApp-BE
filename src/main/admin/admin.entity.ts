import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Promotion from '../promotion/promotion.entity';
import User from '../user/user.entity';

@Entity()
class Admin extends BaseEntity {
  @Column({ name: 'FirstName' })
  public firstName: string;
  @Column({ name: 'LastName' })
  public lastName: string;
  @Column('date', { name: 'DOB' })
  public DOB: Date;
  @Column({ name: 'Status' })
  public status: string;
  @OneToOne(() => User, (user) => user.admin)
  @JoinColumn({ name: 'UserId' })
  public user: User;
  @OneToMany(() => Promotion, (promotion) => promotion.admin)
  public promotion: Promotion[];
}
export default Admin;
