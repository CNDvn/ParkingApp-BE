import { Module } from '@nestjs/common';
import { ParkingSlotService } from './parking-slot.service';
import { ParkingSlotController } from './parking-slot.controller';

@Module({
  controllers: [ParkingSlotController],
  providers: [ParkingSlotService]
})
export class ParkingSlotModule {}
