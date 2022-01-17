import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';

@Module({
  controllers: [PriceListController],
  providers: [PriceListService],
})
export class PriceListModule {}
