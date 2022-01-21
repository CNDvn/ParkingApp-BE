import { WalletReposition } from './wallet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WalletReposition])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
