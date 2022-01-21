import { CarRepository } from './car.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Car from './car.entity';

@Injectable()
export class CarService extends BaseService<Car> {
  constructor(private carRepository: CarRepository) {
    super(carRepository);
  }
}
