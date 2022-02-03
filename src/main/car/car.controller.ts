import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import { CarService } from './car.service';
import { CarCreateDto } from './dto/car-create.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async addCar(
    @GetUser() user: User,
    @Body() carDto: CarCreateDto,
  ): Promise<string> {
    return null;
  }
}
