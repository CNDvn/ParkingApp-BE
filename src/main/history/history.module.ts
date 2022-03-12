import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { BookingModule } from '../booking/booking.module';
import { ParkingModule } from '../parking/parking.module';

@Module({
  imports: [BookingModule, ParkingModule],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
