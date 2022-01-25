import { Module } from '@nestjs/common';
import { TranferTypeService } from './tranfer-type.service';
import { TranferTypeController } from './tranfer-type.controller';

@Module({
  controllers: [TranferTypeController],
  providers: [TranferTypeService]
})
export class TranferTypeModule {}
