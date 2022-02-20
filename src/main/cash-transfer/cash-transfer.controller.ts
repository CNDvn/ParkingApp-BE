import { Controller } from '@nestjs/common';
import { CashTransferService } from './cash-transfer.service';

@Controller('cash-transfers')
export class CashTransferController {
  constructor(private readonly cashTransferService: CashTransferService) {}
}
