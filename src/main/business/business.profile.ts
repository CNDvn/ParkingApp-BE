import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Business from './business.entity';
import BusinessDTO from './business.dto';

@Injectable()
export class BusinessProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      mapper.createMap(Business, BusinessDTO);
    };
  }
}
