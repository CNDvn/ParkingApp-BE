import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService]
})
export class PromotionModule {}
