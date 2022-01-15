import { Module } from '@nestjs/common';
import { CustomerPromotionService } from './customer-promotion.service';
import { CustomerPromotionController } from './customer-promotion.controller';

@Module({
  controllers: [CustomerPromotionController],
  providers: [CustomerPromotionService]
})
export class CustomerPromotionModule {}
