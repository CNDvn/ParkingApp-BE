import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import User from '../user/user.entity';

@Entity()
class Role extends BaseEntity {
  @Column('varchar', {
    name: 'Name',
    length: 10,
    nullable: false,
    unique: true,
  })
  public name: string;
  @OneToMany(() => User, (user) => user.role)
  public users: User[];
}
export default Role;
