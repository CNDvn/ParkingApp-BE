import { Injectable } from '@nestjs/common';
import Booking from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import User from '../user/user.entity';

@Injectable()
export class HistoryService {
  constructor(private bookingService: BookingService) {}

  getMeHistory(user: User, idCar: string): Promise<Booking[]> {
    return this.bookingService.getHistoryBookingByIdCar(idCar, user);
  }
}
