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
import { CustomerPromotionModule } from './main/customer-promotion/customer-promotion.module';
import { PriceListModule } from './main/price-list/price-list.module';
import { PriceListDetailModule } from './main/price-list-detail/price-list-detail.module';
import { AuthModule } from './main/auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './main/auth/jwt/jwt-auth.guard';
import { RolesGuard } from './main/auth/role/roles.guard';
import { RoleModule } from './main/role/role.module';
import { BankModule } from './main/bank/bank.module';
import { CashTransferModule } from './main/cash-transfer/cash-transfer.module';
import { ImageModule } from './main/image/image.module';
import { AllExceptionsFilter } from './exception/catch-all-exception.filter';
import { AutoMapperModuleModule } from './auto-mapper-module/auto-mapper-module.module';
import SmsService from './utils/sms.service';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { VnpayModule } from './main/vnpay/vnpay.module';
// import { RedisModule } from './redis/redis.module';
import { HistoryModule } from './main/history/history.module';
import { PushNotificationModule } from './main/push-notification/push-notification.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        MYSQL_PORT: Joi.number().required(),
        PORT: Joi.number(),
        REDIS_PORT: Joi.number(),
        REDIS_HOST: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    // RedisModule,
    AutoMapperModuleModule,
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
    CustomerPromotionModule,
    PriceListModule,
    PriceListDetailModule,
    AuthModule,
    RoleModule,
    BankModule,
    CashTransferModule,
    ImageModule,
    AutoMapperModuleModule,
    VnpayModule,
    HistoryModule,
    PushNotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SmsService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
