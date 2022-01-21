import { DeleteResult } from 'typeorm';
import { ParkingSlotDto } from './dto/parking-slot.dto';
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
import { ParkingSlotService } from './parking-slot.service';
import { Public } from '../auth/public';
import ParkingSlot from './parking-slot.entity';
@ApiTags('Parking-slot')
@Controller('parking-slot')
export class ParkingSlotController {
  constructor(private readonly parkingSlotService: ParkingSlotService) {}

  @Post()
  @Public()
  async creatParkingSlot(
    @Body() createParkingSlot: ParkingSlotDto,
  ): Promise<ParkingSlot> {
    return await this.parkingSlotService.createData(createParkingSlot);
  }

  @Get()
  @Public()
  async getAllParkingSlot(): Promise<ParkingSlot[]> {
    return await this.parkingSlotService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateParkingSlotById(
    @Param('id') id: string,
    @Body() updateParkingSlot: ParkingSlotDto,
  ): Promise<ParkingSlot> {
    return await this.parkingSlotService.update(id, updateParkingSlot);
  }

  @Delete('/:id')
  @Public()
  async deleteParkingSlotById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.parkingSlotService.deleteById(id);
  }
}
