import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Admin from '../admin/admin.entity';
import BaseEntity from '../base/base.entity';
import CustomerPromotion from '../customer-promotion/customer-promotion.entity';

@Entity()
class Promotion extends BaseEntity {
  @Column({ name: 'Code' })
  public code: string;
  @Column({ name: 'Percent' })
  public percent: number;
  @Column({ name: 'Description' })
  public description: string;
  @Column({ name: 'Status' })
  public status: string;
  @OneToMany(
    () => CustomerPromotion,
    (customerPromotion) => customerPromotion.promotion,
  )
  public customerPromotion: CustomerPromotion[];
  @ManyToOne(() => Admin, (admin) => admin.promotion)
  @JoinColumn({ name: 'AdminId' })
  public admin: Admin;
}

export default Promotion;
