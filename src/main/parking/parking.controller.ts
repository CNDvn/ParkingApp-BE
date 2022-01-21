import { DeleteResult } from 'typeorm';
import { ParkingDto } from './dto/parking.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public';
import { ParkingService } from './parking.service';
import Parking from './parking.entity';
@ApiTags('Parking')
@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @Public()
  async createParking(@Body() createParking: ParkingDto): Promise<Parking> {
    return await this.parkingService.createData(createParking);
  }

  @Get()
  @Public()
  async getAllParking(): Promise<Parking[]> {
    return await this.parkingService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateParkingById(
    @Param('id') id: string,
    @Body() updateParking: ParkingDto,
  ): Promise<Parking> {
    return await this.parkingService.update(id, updateParking);
  }

  @Delete('/:id')
  @Public()
  async deleteParkingById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.parkingService.deleteById(id);
  }
}
