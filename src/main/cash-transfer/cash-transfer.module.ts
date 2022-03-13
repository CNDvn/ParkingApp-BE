import { CashTransferProfile } from './cash-transfer.profile';
import { BankModule } from './../bank/bank.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CashTransferService } from './cash-transfer.service';
import { CashTransferController } from './cash-transfer.controller';
import { CashTransferRepository } from './cash-transfer.repository';
import { VnpayModule } from '../vnpay/vnpay.module';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashTransferRepository]),
    BankModule,
    VnpayModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [CashTransferController],
  providers: [CashTransferService, CashTransferProfile],
  exports: [CashTransferService],
})
export class CashTransferModule {}
