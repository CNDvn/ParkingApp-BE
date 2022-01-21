import { PromotionRepository } from './promotion.repository';
import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionRepository])],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
