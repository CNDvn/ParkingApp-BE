import { WalletReposition } from './wallet.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Wallet from './wallet.entity';

@Injectable()
export class WalletService extends BaseService<Wallet> {
  constructor(private walletRepository: WalletReposition) {
    super(walletRepository);
  }
}
