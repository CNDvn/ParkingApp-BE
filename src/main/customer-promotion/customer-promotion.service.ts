import { CustomerPromotionRepository } from './customer-promotion.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import CustomerPromotion from './customer-promotion.entity';

@Injectable()
export class CustomerPromotionService extends BaseService<CustomerPromotion> {
  constructor(
    private customerPromotionRepository: CustomerPromotionRepository,
  ) {
    super(customerPromotionRepository);
  }
}
