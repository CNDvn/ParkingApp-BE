import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';

@Module({
  controllers: [ParkingController],
  providers: [ParkingService]
})
export class ParkingModule {}
