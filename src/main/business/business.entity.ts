import { AutoMap } from '@automapper/classes';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Parking from '../parking/parking.entity';
import Promotion from '../promotion/promotion.entity';
import User from '../user/user.entity';

@Entity()
class Business extends BaseEntity {
  @AutoMap({ typeFn: () => User })
  @OneToOne(() => User, (user) => user.business)
  @JoinColumn({ name: 'UserId' })
  public user: User;

  @OneToMany(() => Parking, (parking) => parking.business)
  public parkings: Parking[];

  @OneToMany(() => Promotion, (promotion) => promotion.business)
  public promotions: Promotion[];
}
export default Business;
