import { PriceListRepository } from './price-list.repository';
import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PriceListRepository])],
  controllers: [PriceListController],
  providers: [PriceListService],
})
export class PriceListModule {}
