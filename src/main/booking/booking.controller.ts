import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import Booking from './booking.entity';
import { BookingService } from './booking.service';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import Payment from '../payment/payment.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { BookingDto } from './dto/booking.dto';

@Controller('bookings')
@ApiBearerAuth()
@ApiTags('Booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/parking/:parkingId/car/:carId')
  @UseInterceptors(MapInterceptor(BookingDto, Booking))
  async bookSlot(
    @GetUser() user: User,
    @Param('parkingId') parkingId: string,
    @Param('carId') carId: string,
  ): Promise<Booking> {
    return await this.bookingService.bookSlot(user, parkingId, carId);
  }

  @Post('/checkIn/parking/:parkingId/car/:carId')
  @UseInterceptors(MapInterceptor(BookingDto, Booking))
  @Roles(RoleEnum.BUSINESS)
  async checkIn(
    @GetUser() user: User,
    @Param('parkingId') parkingId: string,
    @Param('carId') carId: string,
  ): Promise<Booking> {
    return await this.bookingService.checkIn(user, parkingId, carId);
  }

  @Post('/:bookingId/checkOut')
  @Roles(RoleEnum.CUSTOMER)
  async checkOut(
    @GetUser() user: User,
    @Param('parkingId') parkingId: string,
    @Param('carId') carId: string,
  ): Promise<Payment[]> {
    return await this.bookingService.checkOut(user, parkingId, carId);
  }

  @Get('/car/:carId')
  @UseInterceptors(MapInterceptor(BookingDto, Booking))
  async booking(
    @GetUser() user: User,
    @Param('carId') carId: string,
  ): Promise<Booking> {
    return await this.bookingService.getPresentBooking(user, carId);
  }
}
