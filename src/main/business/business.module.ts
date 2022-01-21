import { BusinessRepository } from './business.repository';
import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessRepository])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
