import { CustomerPromotionRepository } from './customer-promotion.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CustomerPromotionService } from './customer-promotion.service';
import { CustomerPromotionController } from './customer-promotion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerPromotionRepository])],
  controllers: [CustomerPromotionController],
  providers: [CustomerPromotionService],
})
export class CustomerPromotionModule {}
