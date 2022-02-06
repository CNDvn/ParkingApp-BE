import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import { CarService } from './car.service';
import { CarCreateDto } from './dto/car-create.dto';
import Car from './car.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { MapInterceptor } from '@automapper/nestjs';
import { CarResponseDto } from './dto/car-response.dto';
import { StatusEnum } from '../../utils/status.enum';

@Controller('car')
@Roles(RoleEnum.CUSTOMER)
@ApiBearerAuth()
@ApiTags('Cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(MapInterceptor(CarResponseDto, Car))
  async addCar(
    @GetUser() user: User,
    @Body() carDto: CarCreateDto,
  ): Promise<Car> {
    return await this.carService.addCar(user, carDto);
  }

  @Get()
  @UseInterceptors(MapInterceptor(CarResponseDto, Car, { isArray: true }))
  async getAll(@GetUser() user: User): Promise<Car[]> {
    return await this.carService.getAllCars(user);
  }

  @Get('/:id')
  @UseInterceptors(MapInterceptor(CarResponseDto, Car))
  async getCar(@GetUser() user: User, @Param('id') id: string): Promise<Car> {
    const result = await this.carService.getOwnCar(user, id);
    return result;
  }

  @Put('/:id')
  @UseInterceptors(MapInterceptor(CarResponseDto, Car))
  async updateCar(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() carDto: CarCreateDto,
  ): Promise<Car> {
    return await this.carService.updateOwnCar(user, id, carDto);
  }

  @Patch('/:id')
  async updateStatusCar(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    const result = await this.carService.updateStatusOwnCar(
      user,
      id,
      StatusEnum.IN_ACTIVE,
    );
    if (!result) return 'failed';
    return 'success';
  }
}
