import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Parking from './parking.entity';
import ParkingDTO from './parking.dto';

@Injectable()
export class ParkingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper
        .createMap(Parking, ParkingDTO)
        .forMember(
          (destination: ParkingDTO) => destination.coordinates.latitude,
          mapFrom((source: Parking) => {
            return source.coordinate.coordinates[0];
          }),
        )
        .forMember(
          (destination: ParkingDTO) => destination.coordinates.longitude,
          mapFrom((source: Parking) => {
            return source.coordinate.coordinates[1];
          }),
        );
    };
  }
}
