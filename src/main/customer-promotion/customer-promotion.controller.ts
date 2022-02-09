import { Controller } from '@nestjs/common';
import { CustomerPromotionService } from './customer-promotion.service';

@Controller('customer-promotions')
export class CustomerPromotionController {
  constructor(
    private readonly customerPromotionService: CustomerPromotionService,
  ) {}
}
