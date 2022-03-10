import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankRepository } from './bank.repository';
import { BankProfile } from './bank.profile';

@Module({
  imports: [TypeOrmModule.forFeature([BankRepository])],
  controllers: [BankController],
  providers: [BankService, BankProfile],
  exports: [BankService],
})
export class BankModule {}
