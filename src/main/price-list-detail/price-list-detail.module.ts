import { Module } from '@nestjs/common';
import { PriceListDetailService } from './price-list-detail.service';
import { PriceListDetailController } from './price-list-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceListDetailRepository } from './price-list-detail.repository';
import { PriceListDetailProfile } from './price-list-detail.profile';

@Module({
  imports: [TypeOrmModule.forFeature([PriceListDetailRepository])],
  controllers: [PriceListDetailController],
  providers: [PriceListDetailService, PriceListDetailProfile],
  exports: [PriceListDetailService],
})
export class PriceListDetailModule {}
