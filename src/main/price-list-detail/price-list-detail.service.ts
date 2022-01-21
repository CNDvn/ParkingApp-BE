import { PriceListDetailRepository } from './price-list-detail.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import PriceListDetail from './price-list-detail.entity';

@Injectable()
export class PriceListDetailService extends BaseService<PriceListDetail> {
  constructor(private priceListDetailRepository: PriceListDetailRepository) {
    super(priceListDetailRepository);
  }
}
