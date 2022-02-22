import { Mapper, MappingProfile } from '@automapper/core';
import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import ServiceDTO from './service.dto';
import Service from './service.entity';
@Injectable()
export class ServiceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(Service, ServiceDTO);
    };
  }
}
