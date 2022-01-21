import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Public } from '../auth/public';
import { BookingDto } from './dto/booking.dto';
import Booking from './booking.entity';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Public()
  async createBooking(@Body() createBooking: BookingDto): Promise<Booking> {
    return await this.bookingService.createData(createBooking);
  }

  @Get()
  @Public()
  async getAllBooking(): Promise<Booking[]> {
    return await this.bookingService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateBookingById(
    @Param('id') id: string,
    @Body() updateBooking: BookingDto,
  ): Promise<Booking> {
    return await this.bookingService.update(id, updateBooking);
  }

  @Delete('/:id')
  @Public()
  async deleteBookingById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.bookingService.deleteById(id);
  }
}
