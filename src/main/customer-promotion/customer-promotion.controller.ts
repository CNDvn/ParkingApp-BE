import { Controller } from '@nestjs/common';
import { CustomerPromotionService } from './customer-promotion.service';

@Controller('customer-promotion')
export class CustomerPromotionController {
  constructor(private readonly customerPromotionService: CustomerPromotionService) {}
}
