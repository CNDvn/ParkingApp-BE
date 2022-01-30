import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared/shared.module';
import { CustomerProfile } from './customer.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository]),
    RoleModule,
    UserModule,
    SharedModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerProfile],
  exports: [CustomerService],
})
export class CustomerModule {}
