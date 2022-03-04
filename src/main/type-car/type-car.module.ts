import { Module } from '@nestjs/common';
import { TypeCarService } from './type-car.service';
import { TypeCarController } from './type-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCarRepository } from './type-car.repository';
import { TypecarProfile } from './typecar.profile';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCarRepository])],
  controllers: [TypeCarController],
  providers: [TypeCarService, TypecarProfile],
  exports: [TypeCarService],
})
export class TypeCarModule {}
