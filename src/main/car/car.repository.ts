import { EntityRepository, Repository } from 'typeorm';
import Car from './car.entity';

@EntityRepository(Car)
export class CarRepository extends Repository<Car> {}
