import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { PaymentProfile } from './payment.profile';
import { TransactionModule } from '../transaction/transaction.module';
import { WalletModule } from '../wallet/wallet.module';
import { BookingModule } from '../booking/booking.module';
import { ParkingModule } from '../parking/parking.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/shared/shared.module';
import { CarModule } from '../car/car.module';
import { ParkingSlotModule } from '../parking-slot/parking-slot.module';
import { VnpayModule } from '../vnpay/vnpay.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository]),
    TransactionModule,
    WalletModule,
    forwardRef(() => BookingModule),
    ParkingModule,
    UserModule,
    TransactionModule,
    SharedModule,
    CarModule,
    ParkingSlotModule,
    VnpayModule,
    BankModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentProfile],
  exports: [PaymentService],
})
export class PaymentModule {}
