import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Customer from './customer.entity';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private customerRepository: Repository<Customer>;

  hello = (): void => {
    // eslint-disable-next-line no-console
    console.log('chao');
  };
}
