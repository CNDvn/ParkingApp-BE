import { PriceListDetailRepository } from './price-list-detail.repository';
import { Module } from '@nestjs/common';
import { PriceListDetailService } from './price-list-detail.service';
import { PriceListDetailController } from './price-list-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PriceListDetailRepository])],
  controllers: [PriceListDetailController],
  providers: [PriceListDetailService],
})
export class PriceListDetailModule {}
