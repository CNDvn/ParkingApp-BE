import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import User from '../user/user.entity';
import Car from './car.entity';
import { CarRepository } from './car.repository';
import { CarCreateDto } from './dto/car-create.dto';

@Injectable()
export class CarService extends BaseService<Car> {
  constructor(private carRepository: CarRepository) {
    super(carRepository);
  }

  async addCar(user: User, car: CarCreateDto): Promise<Car> {
    return null;
  }
}
