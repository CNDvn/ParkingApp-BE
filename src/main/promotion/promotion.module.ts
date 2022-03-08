import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionRepository } from './promotion.repository';
import { PromotionProfile } from './promotion.profile';
import { ParkingModule } from '../parking/parking.module';
import { CustomerPromotionModule } from '../customer-promotion/customer-promotion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionRepository]),
    ParkingModule,
    CustomerPromotionModule,
  ],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionProfile],
})
export class PromotionModule {}
