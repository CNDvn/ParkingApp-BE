import { PriceListRepository } from './price-list.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import PriceList from './price-list.entity';

@Injectable()
export class PriceListService extends BaseService<PriceList> {
  constructor(private priceListRepository: PriceListRepository) {
    super(priceListRepository);
  }
}
