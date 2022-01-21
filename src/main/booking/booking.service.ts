import { BookingRepository } from './booking.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Booking from './booking.entity';

@Injectable()
export class BookingService extends BaseService<Booking> {
  constructor(private bookingRepository: BookingRepository) {
    super(bookingRepository);
  }
}
