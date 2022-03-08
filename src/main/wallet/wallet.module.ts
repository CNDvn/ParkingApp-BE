import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletRepository } from './wallet.repository';
import { WalletProfile } from './wallet.profile';

@Module({
  imports: [TypeOrmModule.forFeature([WalletRepository])],
  controllers: [WalletController],
  providers: [WalletService, WalletProfile],
  exports: [WalletService],
})
export class WalletModule {}
