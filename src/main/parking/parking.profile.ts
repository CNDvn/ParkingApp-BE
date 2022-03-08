import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Parking from './parking.entity';
import ParkingDTO from './dto/parking.dto';
import { StatusEnum } from '../../utils/status.enum';

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
        )
        .forMember(
          (destination: ParkingDTO) => destination.slotEmpty,
          mapFrom((source) => {
            const slotEmpty = source.parkingSlots.filter((slot) => {
              if (slot.status === StatusEnum.EMPTY) return true;
              return false;
            });
            return slotEmpty.length;
          }),
        )
        .forMember(
          (destination: ParkingDTO) => destination.slotFull,
          mapFrom((source) => {
            const slotFull = source.parkingSlots.filter((slot) => {
              if (slot.status === StatusEnum.Full) return true;
              return false;
            });
            return slotFull.length;
          }),
        );
    };
  }
}
