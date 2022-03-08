import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import PriceList from '../price-list/price-list.entity';
import PriceListDetail from './price-list-detail.entity';
import { PriceListDetailRepository } from './price-list-detail.repository';

@Injectable()
export class PriceListDetailService extends BaseService<PriceListDetail> {
  constructor(private priceListDetailRepository: PriceListDetailRepository) {
    super(priceListDetailRepository);
  }

  async findPriceListDetailByIdPriceList(
    priceList: PriceList,
  ): Promise<PriceListDetail> {
    return this.priceListDetailRepository.findOne({ priceList });
  }
}
