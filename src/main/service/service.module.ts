import { ServiceProfile } from './service.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';
import { ParkingModule } from '../parking/parking.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRepository]), ParkingModule],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceProfile],
})
export class ServiceModule {}
