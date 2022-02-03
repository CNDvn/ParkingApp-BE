import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './car.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CarRepository])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
