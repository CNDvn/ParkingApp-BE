import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Business from './business.entity';
import { BusinessRepository } from './business.repository';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(private businessRepository: BusinessRepository) {
    super(businessRepository);
  }
}
