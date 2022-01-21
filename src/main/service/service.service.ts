import { ServiceRepository } from './service.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Service from './service.entity';

@Injectable()
export class ServiceService extends BaseService<Service> {
  constructor(private serviceRepository: ServiceRepository) {
    super(serviceRepository);
  }
}
