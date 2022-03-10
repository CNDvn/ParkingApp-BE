import { CardProfile } from './card.profile';
import { BankModule } from './../bank/bank.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardRepository } from './card.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CardRepository]), BankModule],
  controllers: [CardController],
  providers: [CardService, CardProfile],
  exports: [CardService],
})
export class CardModule {}
