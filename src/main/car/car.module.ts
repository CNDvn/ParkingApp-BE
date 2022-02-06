import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './car.repository';
import { TypeCarModule } from '../type-car/type-car.module';
import { ImageModule } from '../image/image.module';
import { CarProfile } from './car.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarRepository]),
    TypeCarModule,
    ImageModule,
  ],
  controllers: [CarController],
  providers: [CarService, CarProfile],
})
export class CarModule {}
