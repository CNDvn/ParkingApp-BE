import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Customer from '../customer/customer.entity';
import Promotion from '../promotion/promotion.entity';

@Entity()
class CustomerPromotion extends BaseEntity {
  @Column('varchar', { name: 'Status', length: 20, nullable: false })
  public status: string;
  @ManyToOne(() => Customer, (customer) => customer.customerPromotions)
  @JoinColumn({ name: 'CustomerId' })
  public customer: Customer;
  @ManyToOne(() => Promotion, (promotion) => promotion.customerPromotions)
  @JoinColumn({ name: 'PromotionId' })
  public promotion: Promotion;
}

export default CustomerPromotion;
