import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import Customer from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(private customerRepository: CustomerRepository) {
    super(customerRepository);
  }
}
