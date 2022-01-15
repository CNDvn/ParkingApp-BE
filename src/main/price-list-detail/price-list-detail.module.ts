import { Module } from '@nestjs/common';
import { PriceListDetailService } from './price-list-detail.service';
import { PriceListDetailController } from './price-list-detail.controller';

@Module({
  controllers: [PriceListDetailController],
  providers: [PriceListDetailService]
})
export class PriceListDetailModule {}
