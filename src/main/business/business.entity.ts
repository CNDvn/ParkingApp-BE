import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Parking from '../parking/parking.entity';
import User from '../user/user.entity';

@Entity()
class Business extends BaseEntity {
  @Column('varchar', { name: 'Address', nullable: false })
  public address: string;
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
  @OneToOne(() => User, (user) => user.business)
  @JoinColumn({ name: 'UserId' })
  public user: User;
  @OneToMany(() => Parking, (parking) => parking.business)
  public parking: Parking[];
}
export default Business;
