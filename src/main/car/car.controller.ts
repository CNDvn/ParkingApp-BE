import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import { CarService } from './car.service';
import { CarCreateDto } from './dto/car-create.dto';
import Car from './car.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { MapInterceptor } from '@automapper/nestjs';
import { CarResponseDto } from './dto/car-response.dto';
import { StatusEnum } from '../../utils/status.enum';

@Controller('cars')
@ApiBearerAuth()
@ApiTags('Cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Roles(RoleEnum.CUSTOMER)
  @Post()
  @UseInterceptors(MapInterceptor(CarResponseDto, Car))
  async addCar(
    @GetUser() user: User,
    @Body() carDto: CarCreateDto,
  ): Promise<Car> {
    return await this.carService.addCar(user, carDto);
  }

  @Roles(RoleEnum.CUSTOMER)
  @ApiResponse({
    status: 200,
    description: 'Get List Car Of Owner',
  })
  @Get('me')
  @UseInterceptors(MapInterceptor(CarResponseDto, Car, { isArray: true }))
  async getAllCarMe(@GetUser() user: User): Promise<Car[]> {
    return await this.carService.getAllCarsOwner(user);
  }

  @Roles(RoleEnum.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Get List Car',
  })
  @Get()
  @UseInterceptors(MapInterceptor(CarResponseDto, Car, { isArray: true }))
  async getAll(): Promise<Car[]> {
    return await this.carService.getAllCars();
  }

  @Roles(RoleEnum.CUSTOMER)
  @Get('/:id')
  @UseInterceptors(MapInterceptor(CarResponseDto, Car))
  async getCar(@GetUser() user: User, @Param('id') id: string): Promise<Car> {
    const result = await this.carService.getOwnCar(user, id);
    return result;
  }

  @Roles(RoleEnum.CUSTOMER)
  @Put('/:id')
  @UseInterceptors(MapInterceptor(CarResponseDto, Car))
  async updateCar(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() carDto: CarCreateDto,
  ): Promise<Car> {
    return await this.carService.updateOwnCar(user, id, carDto);
  }

  @Roles(RoleEnum.CUSTOMER)
  @Delete('/:id')
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
