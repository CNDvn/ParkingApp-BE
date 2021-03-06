import { ParkingInfoProfile } from './parking-info.profile';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingRepository } from './parking.repository';
import { BusinessModule } from '../business/business.module';
import { ParkingProfile } from './parking.profile';
import { ParkingDetailProfile } from './parking-detail.profile';
import { PagerMiddleware } from 'src/middleware/pagerMiddleware';
import { ImageModule } from '../image/image.module';
// import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingRepository]),
    BusinessModule,
    ImageModule,
    // RedisModule,
  ],
  controllers: [ParkingController],
  providers: [
    ParkingService,
    ParkingProfile,
    ParkingDetailProfile,
    ParkingInfoProfile,
  ],
  exports: [ParkingService],
})
export class ParkingModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(PagerMiddleware).forRoutes(
      { path: 'parkings/OwnerParking', method: RequestMethod.GET },
      {
        path: 'parkings',
        method: RequestMethod.GET,
      },
    );
  }
}
