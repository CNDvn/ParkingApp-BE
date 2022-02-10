import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
}
