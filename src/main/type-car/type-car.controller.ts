import { TypeCarDto } from './dto/type-car.dto';
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
import { TypeCarService } from './type-car.service';
import { Public } from '../auth/public';
import TypeCar from './type-car.entity';
import { DeleteResult } from 'typeorm';
@ApiTags('Type-car')
@Controller('type-car')
export class TypeCarController {
  constructor(private readonly typeCarService: TypeCarService) {}

  @Post()
  @Public()
  async creatTypeCar(@Body() createTypeCar: TypeCarDto): Promise<TypeCar> {
    return await this.typeCarService.createData(createTypeCar);
  }

  @Get()
  @Public()
  async getAllTypeCar(): Promise<TypeCar[]> {
    return await this.typeCarService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateTypeCarById(
    @Param('id') id: string,
    @Body() updateTypeCar: TypeCarDto,
  ): Promise<TypeCar> {
    return await this.typeCarService.update(id, updateTypeCar);
  }

  @Delete('/:id')
  @Public()
  async deleteTypeCarById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.typeCarService.deleteById(id);
  }
}
