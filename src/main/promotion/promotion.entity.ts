import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import CustomerPromotion from '../customer-promotion/customer-promotion.entity';

@Entity()
class Promotion extends BaseEntity {
  @Column('varchar', { name: 'Code', length: 15, nullable: false })
  public code: string;
  @Column('int', { name: 'Percent' })
  public percent: number;
  @Column('text', { name: 'Description' })
  public description: string;
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
  @OneToMany(
    () => CustomerPromotion,
    (customerPromotion) => customerPromotion.promotion,
  )
  public customerPromotion: CustomerPromotion[];
}

export default Promotion;
