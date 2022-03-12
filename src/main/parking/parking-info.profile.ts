import { Mapper } from '@automapper/core';
import { InjectMapper, AutomapperProfile } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ParkingInfoDto } from './dto/parking-info.dto';
import Parking from './parking.entity';
@Injectable()
export class ParkingInfoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(Parking, ParkingInfoDto);
    };
  }
}
