import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Customer from '../customer/customer.entity';
import Promotion from '../promotion/promotion.entity';

@Entity()
class CustomerPromotion extends BaseEntity {
  @Column({ name: 'Status' })
  public status: string;
  @ManyToOne(() => Customer, (customer) => customer.customerPromotion)
  @JoinColumn({ name: 'CustomerId' })
  public customer: Customer;
  @ManyToOne(() => Promotion, (promotion) => promotion.customerPromotion)
  @JoinColumn({ name: 'PromotionId' })
  public promotion: Promotion;
}

export default CustomerPromotion;
