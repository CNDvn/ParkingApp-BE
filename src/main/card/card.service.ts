import { CardController } from './card.controller';
import { BankService } from './../bank/bank.service';
import { CardCreateDto } from './dto/card-create.dto';
import { CardRepository } from './card.repository';
import { BaseService } from './../base/base.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import Card from './card.entity';
import User from '../user/user.entity';

@Injectable()
export class CardService extends BaseService<Card> {
  constructor(
    private cardRepository: CardRepository,
    private bankService: BankService,
  ) {
    super(cardRepository);
  }

  async addCard(dto: CardCreateDto, bankId: string, user: User): Promise<Card> {
    const bank = await this.bankService.findById(bankId);
    if (!bank) throw new BadRequestException('Bank not found');

    return await this.cardRepository.save({
      dateValidFrom: dto.dateValidFrom,
      cardHolder: dto.cardHolder,
      cardNumber: dto.cardNumber,
      bank: bank,
      user: user,
    });
  }

  async getOwnCard(user: User, id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id: id, user: user },
    });
    if (!card) throw new BadRequestException('This card not found');
    return card;
  }

  async getAllOwnCard(user: User): Promise<Card[]> {
    const cards = await this.cardRepository.find({ where: { user: user } });
    return cards;
  }

  async updateOwnCard(
    user: User,
    dto: CardCreateDto,
    id: string,
  ): Promise<Card> {
    const card = await this.update(id, {
      cardHolder: dto.cardHolder,
      cardNumber: dto.cardNumber,
      dateValidFrom: dto.dateValidFrom,
    });
    if (!card) throw new BadRequestException('update failed');
    return card;
  }
}
