import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './main/customer/customer.module';
import { CarModule } from './main/car/car.module';
import { ParkingModule } from './main/parking/parking.module';
import { UserModule } from './main/user/user.module';
import { TypeCarModule } from './main/type-car/type-car.module';
import { WalletModule } from './main/wallet/wallet.module';
import { BookingModule } from './main/booking/booking.module';
import { ParkingSlotModule } from './main/parking-slot/parking-slot.module';
import { PaymentModule } from './main/payment/payment.module';
import { TransactionModule } from './main/transaction/transaction.module';
import { ServiceModule } from './main/service/service.module';
import { PromotionModule } from './main/promotion/promotion.module';
import { BusinessModule } from './main/business/business.module';
import { AdminModule } from './main/admin/admin.module';
import { CustomerPromotionModule } from './main/customer-promotion/customer-promotion.module';
import { PriceListModule } from './main/price-list/price-list.module';
import { PriceListDetailModule } from './main/price-list-detail/price-list-detail.module';
import { AuthModule } from './main/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './main/auth/jwt/jwt-auth.guard';
import { RolesGuard } from './main/auth/role/roles.guard';
import { AllExceptionsFilter } from './exception/catch-all-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        MYSQL_PORT: Joi.number().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    CustomerModule,
    CarModule,
    ParkingModule,
    UserModule,
    TypeCarModule,
    WalletModule,
    BookingModule,
    ParkingSlotModule,
    PaymentModule,
    TransactionModule,
    ServiceModule,
    PromotionModule,
    BusinessModule,
    AdminModule,
    CustomerPromotionModule,
    PriceListModule,
    PriceListDetailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
