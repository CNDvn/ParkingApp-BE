import { TypeCarRepository } from './type-car.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import TypeCar from './type-car.entity';

@Injectable()
export class TypeCarService extends BaseService<TypeCar> {
  constructor(private typeCarRepository: TypeCarRepository) {
    super(typeCarRepository);
  }
}
