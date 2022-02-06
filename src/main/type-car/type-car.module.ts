import { Module } from '@nestjs/common';
import { TypeCarService } from './type-car.service';
import { TypeCarController } from './type-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCarRepository } from './type-car.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCarRepository])],
  controllers: [TypeCarController],
  providers: [TypeCarService],
  exports: [TypeCarService],
})
export class TypeCarModule {}
