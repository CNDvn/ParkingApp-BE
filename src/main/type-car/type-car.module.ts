import { Module } from '@nestjs/common';
import { TypeCarService } from './type-car.service';
import { TypeCarController } from './type-car.controller';

@Module({
  controllers: [TypeCarController],
  providers: [TypeCarService],
})
export class TypeCarModule {}
