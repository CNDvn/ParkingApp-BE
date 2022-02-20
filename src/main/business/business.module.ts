import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from './business.repository';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import { BusinessProfile } from './business.profile';
import SmsService from 'src/utils/sms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessRepository]),
    RoleModule,
    UserModule,
    SharedModule,
  ],
  controllers: [BusinessController],
  providers: [BusinessService, BusinessProfile, SmsService],
  exports: [BusinessService],
})
export class BusinessModule {}
