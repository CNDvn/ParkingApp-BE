import { CashTransferResDto } from './dto/cash-transfer-res.dto';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
import CashTransfer from './cash-transfer.entity';

@Injectable()
export class CashTransferProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  mapProfile(): MappingProfile {
    return (mapper: Mapper): void => {
      mapper.createMap(CashTransfer, CashTransferResDto);
    };
  }
}
