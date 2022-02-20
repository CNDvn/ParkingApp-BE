import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { BusinessModule } from '../business/business.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionRepository } from './promotion.repository';
import { PromotionProfile } from './promotion.profile';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionRepository]), BusinessModule],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionProfile],
})
export class PromotionModule {}
