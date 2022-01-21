import { PromotionRepository } from './promotion.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Promotion from './promotion.entity';

@Injectable()
export class PromotionService extends BaseService<Promotion> {
  constructor(private promotionRepository: PromotionRepository) {
    super(promotionRepository);
  }
}
