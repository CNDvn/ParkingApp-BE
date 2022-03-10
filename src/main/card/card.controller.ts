import { Controller } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('cash-transfers')
export class CardController {
  constructor(private readonly cashTransferService: CardService) {}
}
