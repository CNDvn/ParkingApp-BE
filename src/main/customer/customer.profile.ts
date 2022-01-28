import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Customer from './customer.entity';
import CustomerDTO from './customer.dto';

@Injectable()
export class CustomerProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      mapper.createMap(Customer, CustomerDTO);
    };
  }
}
