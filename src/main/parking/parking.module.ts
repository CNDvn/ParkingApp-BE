import { ParkingRepository } from './parking.repository';
import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingRepository])],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
