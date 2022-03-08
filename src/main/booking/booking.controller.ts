import { Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import Booking from './booking.entity';
import { BookingService } from './booking.service';

@Controller('bookings')
@ApiBearerAuth()
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/parking/:parkingId/car/:carId')
  async bookSlot(
    @GetUser() user: User,
    @Param('parkingId') parkingId: string,
    @Param('carId') carId: string,
  ): Promise<Booking> {
    return await this.bookingService.bookSlot(user, parkingId, carId);
  }
}
