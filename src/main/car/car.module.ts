import { CarRepository } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CarRepository])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
