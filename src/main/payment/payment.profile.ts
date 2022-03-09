import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import Payment from './payment.entity';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(Payment, PaymentDto);
    };
  }
}
