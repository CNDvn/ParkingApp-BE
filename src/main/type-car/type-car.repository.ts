import { EntityRepository, Repository } from 'typeorm';
import TypeCar from './type-car.entity';

@EntityRepository(TypeCar)
export class TypeCarRepository extends Repository<TypeCar> {}
