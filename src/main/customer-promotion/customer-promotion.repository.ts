import { EntityRepository, Repository } from 'typeorm';
import CustomerPromotion from './customer-promotion.entity';

@EntityRepository(CustomerPromotion)
export class CustomerPromotionRepository extends Repository<CustomerPromotion> {}
