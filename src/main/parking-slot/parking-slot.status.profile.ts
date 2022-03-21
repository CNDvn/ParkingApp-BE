import { Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import ParkingSlotStatusDTO from './dto/parking-slot.status.dto';

import ParkingSlot from './parking-slot.entity';
@Injectable()
export class ParkingSlotStatusProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(ParkingSlot, ParkingSlotStatusDTO);
    };
  }
}
