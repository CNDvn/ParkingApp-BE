import { Module } from '@nestjs/common';
import { ParkingSlotService } from './parking-slot.service';
import { ParkingSlotController } from './parking-slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSlotRepository } from './parking-slot.repository';
import { ParkingModule } from '../parking/parking.module';
import { ParkingSlotProfile } from './parking-slot.profile';
import { ParkingSlotStatusProfile } from './parking-slot.status.profile';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSlotRepository]), ParkingModule],
  controllers: [ParkingSlotController],
  providers: [ParkingSlotService, ParkingSlotProfile, ParkingSlotStatusProfile],
  exports: [ParkingSlotService],
})
export class ParkingSlotModule {}
