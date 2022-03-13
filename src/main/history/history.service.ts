import { Injectable } from '@nestjs/common';
import Booking from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import User from '../user/user.entity';

@Injectable()
export class HistoryService {
  constructor(private bookingService: BookingService) {}

  async getMeHistory(user: User, idCar: string): Promise<Booking[]> {
    return await this.bookingService.getHistoryBookingByIdCar(idCar, user);
  }

  getBusinessHistory(user: User, idCar: string): Promise<Booking[]> {
    return this.bookingService.getHistoryBookingByIdParking(idCar, user);
  }
}
