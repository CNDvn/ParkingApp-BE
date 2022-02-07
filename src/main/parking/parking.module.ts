import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRepository } from './parking.repository';
import { BusinessModule } from '../business/business.module';
import { ParkingProfile } from './parking.profile';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingRepository]), BusinessModule],
  controllers: [ParkingController],
  providers: [ParkingService, ParkingProfile],
  exports: [ParkingService],
})
export class ParkingModule {}
