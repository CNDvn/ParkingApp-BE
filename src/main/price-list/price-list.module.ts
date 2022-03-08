import { Module } from '@nestjs/common';
import { PriceListService } from './price-list.service';
import { PriceListController } from './price-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceListRepository } from './price-list.repository';
import { ParkingModule } from '../parking/parking.module';
import { PriceListDetailModule } from '../price-list-detail/price-list-detail.module';
import { TypeCarModule } from '../type-car/type-car.module';
import { PriceListProfile } from './price-list.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceListRepository]),
    ParkingModule,
    PriceListDetailModule,
    TypeCarModule,
  ],
  controllers: [PriceListController],
  providers: [PriceListService, PriceListProfile],
})
export class PriceListModule {}
