import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import PriceListDetail from './price-list-detail.entity';
import PriceListDetailDTO from './dto/price-list-detail.dto';

@Injectable()
export class PriceListDetailProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(PriceListDetail, PriceListDetailDTO);
    };
  }
}
