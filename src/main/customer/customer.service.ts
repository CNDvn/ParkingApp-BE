import { CustomerRepository } from './customer.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Customer from './customer.entity';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(private customerRepository: CustomerRepository) {
    super(customerRepository);
  }
}
