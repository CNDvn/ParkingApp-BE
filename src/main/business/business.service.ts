import { BusinessRepository } from './business.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Business from './business.entity';

@Injectable()
export class BusinessService extends BaseService<Business> {
  constructor(private businessRepository: BusinessRepository) {
    super(businessRepository);
  }
}
