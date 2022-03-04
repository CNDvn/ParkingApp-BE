import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { WalletDTO } from './dto/wallet.dto';
import Wallet from './wallet.entity';

@Injectable()
export class WalletProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(Wallet, WalletDTO);
    };
  }
}
