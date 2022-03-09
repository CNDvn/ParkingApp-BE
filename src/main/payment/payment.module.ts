import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { PaymentProfile } from './payment.profile';
import { TransactionModule } from '../transaction/transaction.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository]),
    TransactionModule,
    WalletModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentProfile],
  exports: [PaymentService],
})
export class PaymentModule {}
