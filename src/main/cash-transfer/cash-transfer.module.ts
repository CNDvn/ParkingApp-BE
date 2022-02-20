import { Module } from '@nestjs/common';
import { CashTransferService } from './cash-transfer.service';
import { CashTransferController } from './cash-transfer.controller';

@Module({
  controllers: [CashTransferController],
  providers: [CashTransferService],
})
export class CashTransferModule {}
