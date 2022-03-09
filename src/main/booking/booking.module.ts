import { ParkingSlotModule } from './../parking-slot/parking-slot.module';
import { WalletModule } from './../wallet/wallet.module';
import { CarModule } from './../car/car.module';
import { ParkingModule } from './../parking/parking.module';
import { UserModule } from './../user/user.module';
import { RoleModule } from './../role/role.module';
import { BookingRepository } from './booking.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PaymentModule } from '../payment/payment.module';
import { BookingProfile } from './booking.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingRepository]),
    RoleModule,
    UserModule,
    ParkingModule,
    CarModule,
    WalletModule,
    ParkingSlotModule,
    PaymentModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingProfile],
})
export class BookingModule {}
