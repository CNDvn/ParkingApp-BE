import { TypeCarRepository } from './type-car.repository';
import { Module } from '@nestjs/common';
import { TypeCarService } from './type-car.service';
import { TypeCarController } from './type-car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCarRepository])],
  controllers: [TypeCarController],
  providers: [TypeCarService],
})
export class TypeCarModule {}
