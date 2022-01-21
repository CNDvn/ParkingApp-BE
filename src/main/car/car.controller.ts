import { DeleteResult } from 'typeorm';
import { CarDto } from './dto/car.dto';
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
import { CarService } from './car.service';
import Car from './car.entity';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @Public()
  async createCar(@Body() createCar: CarDto): Promise<Car> {
    return await this.carService.createData(createCar);
  }

  @Get()
  @Public()
  async getAllCar(): Promise<Car[]> {
    return await this.carService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateCarById(
    @Param('id') id: string,
    @Body() updateCar: CarDto,
  ): Promise<Car> {
    return await this.carService.update(id, updateCar);
  }

  @Delete('/:id')
  @Public()
  async deleteCarById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.carService.deleteById(id);
  }
}
