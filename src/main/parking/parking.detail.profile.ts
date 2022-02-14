import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Parking from './parking.entity';
import ParkingDTO from './parking.dto';
import ParkingDetailDTO from './parking.detail.dto';

@Injectable()
export class ParkingDetailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(Parking, ParkingDetailDTO, {
        extends: [mapper.getMapping(Parking, ParkingDTO)],
      });
    };
  }
}
