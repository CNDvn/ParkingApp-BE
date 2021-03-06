import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import CustomerPromotion from '../customer-promotion/customer-promotion.entity';
import Parking from '../parking/parking.entity';

@Entity()
class Promotion extends BaseEntity {
  @AutoMap()
  @Column('varchar', { name: 'Code', length: 15, nullable: false })
  public code: string;

  @AutoMap()
  @Column('int', { name: 'Percent' })
  public percent: number;

  @AutoMap()
  @Column('text', { name: 'Description' })
  public description: string;

  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
  @OneToMany(
    () => CustomerPromotion,
    (customerPromotion) => customerPromotion.promotion,
  )
  public customerPromotions: CustomerPromotion[];

  @ManyToOne(() => Parking, (parking) => parking.promotions)
  public parking: Parking;
}

export default Promotion;
