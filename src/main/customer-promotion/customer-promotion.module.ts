import { Module } from '@nestjs/common';
import { CustomerPromotionService } from './customer-promotion.service';
import { CustomerPromotionController } from './customer-promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPromotionRepository } from './customer-promotion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerPromotionRepository])],
  controllers: [CustomerPromotionController],
  providers: [CustomerPromotionService],
  exports: [CustomerPromotionService],
})
export class CustomerPromotionModule {}
