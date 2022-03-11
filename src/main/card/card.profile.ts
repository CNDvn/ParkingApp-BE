import { CardDto } from './dto/card.dto';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
import Card from './card.entity';

@Injectable()
export class CardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(Card, CardDto);
    };
  }
}
