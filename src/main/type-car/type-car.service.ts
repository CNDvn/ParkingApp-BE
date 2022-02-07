import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import TypeCar from './type-car.entity';
import { TypeCarRepository } from './type-car.repository';

@Injectable()
export class TypeCarService extends BaseService<TypeCar> {
  constructor(private typeCarRepository: TypeCarRepository) {
    super(typeCarRepository);
  }
}
