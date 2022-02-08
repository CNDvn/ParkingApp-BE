import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
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
      mapper
        .createMap(
          Parking,
          ParkingDetailDTO,
          //   {
          //   extends: [mapper.getMapping(Parking, ParkingDTO)],
          // }
        )
        .forMember(
          (destination: ParkingDetailDTO) => destination.coordinates.latitude,
          mapFrom((source: Parking) => {
            console.log('abc');
            console.log(source);

            return source.coordinate.coordinates[0];
          }),
        )
        .forMember(
          (destination: ParkingDetailDTO) => destination.coordinates.longitude,
          mapFrom((source: Parking) => {
            return source.coordinate.coordinates[1];
          }),
        );
    };
  }
}
