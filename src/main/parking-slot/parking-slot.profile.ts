import { Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import ParkingSlotDTO from './parking-slot.dto';
import ParkingSlot from './parking-slot.entity';
@Injectable()
export class ParkingSlotProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(ParkingSlot, ParkingSlotDTO);
    };
  }
}
