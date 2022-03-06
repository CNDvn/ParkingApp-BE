import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TypeCarService } from './type-car.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MapInterceptor } from '@automapper/nestjs';
import TypeCarDto from './dto/type-car.dto';
import TypeCar from './type-car.entity';
import { createTypeCarDto } from './dto/create-type-car.dto';
import { RoleEnum } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';

@Controller('type-cars')
@ApiBearerAuth()
@ApiTags('TypeCars')
export class TypeCarController {
  constructor(private readonly typeCarService: TypeCarService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  @UseInterceptors(MapInterceptor(TypeCarDto, TypeCar))
  async addTypeCar(@Body() typeCar: createTypeCarDto): Promise<TypeCar> {
    return await this.typeCarService.createData(typeCar);
  }

  @Roles(RoleEnum.ADMIN)
  @Put('/:id')
  @UseInterceptors(MapInterceptor(TypeCarDto, TypeCar))
  async updateCar(
    @Body() typeCar: createTypeCarDto,
    @Param('id') id: string,
  ): Promise<TypeCar> {
    return await this.typeCarService.update(id, typeCar);
  }

  @Get()
  @UseInterceptors(MapInterceptor(TypeCarDto, TypeCar, { isArray: true }))
  async getAll(): Promise<TypeCar[]> {
    return await this.typeCarService.getAll();
  }

  @Get('/:id')
  @UseInterceptors(MapInterceptor(TypeCarDto, TypeCar))
  async getTypeCar(@Param('id') id: string): Promise<TypeCar> {
    return await this.typeCarService.findById(id);
  }
}
