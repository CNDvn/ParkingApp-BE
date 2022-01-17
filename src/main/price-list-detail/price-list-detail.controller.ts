import { Controller } from '@nestjs/common';
import { PriceListDetailService } from './price-list-detail.service';

@Controller('price-list-detail')
export class PriceListDetailController {
  constructor(
    private readonly priceListDetailService: PriceListDetailService,
  ) {}
}
