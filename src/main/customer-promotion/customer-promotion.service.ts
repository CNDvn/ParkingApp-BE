import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import CustomerPromotion from './customer-promotion.entity';
import { CustomerPromotionRepository } from './customer-promotion.repository';
import Promotion from '../promotion/promotion.entity';
import Customer from '../customer/customer.entity';
import { StatusEnum } from '../../utils/status.enum';

@Injectable()
export class CustomerPromotionService extends BaseService<CustomerPromotion> {
  constructor(
    private customerPromotionRepository: CustomerPromotionRepository,
  ) {
    super(customerPromotionRepository);
  }

  async applyPromotion(
    promotion: Promotion,
    customer: Customer,
  ): Promise<boolean> {
    const result = await this.customerPromotionRepository.save({
      promotion,
      customer,
      status: StatusEnum.ACTIVE,
    });
    if (result) return true;
    return false;
  }
}
