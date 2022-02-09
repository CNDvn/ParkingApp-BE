import { Controller } from '@nestjs/common';
import { PriceListService } from './price-list.service';

@Controller('price-lists')
export class PriceListController {
  constructor(private readonly priceListService: PriceListService) {}
}
