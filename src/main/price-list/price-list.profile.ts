import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import PriceListDTO from './dto/price-list.dto';
import PriceList from './price-list.entity';

@Injectable()
export class PriceListProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(PriceList, PriceListDTO).forMember(
        (destination: PriceListDTO) => destination.nameParking,
        mapFrom((source: PriceList) => {
          return source.parking.name;
        }),
      );
    };
  }
}
