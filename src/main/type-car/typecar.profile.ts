import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import TypeCar from './type-car.entity';
import TypeCarDto from './dto/type-car.dto';
import { Mapper, MappingProfile } from '@automapper/core';

@Injectable()
export class TypecarProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(TypeCar, TypeCarDto);
    };
  }
}
