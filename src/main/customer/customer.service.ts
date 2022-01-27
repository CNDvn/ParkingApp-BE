import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Customer from './customer.entity';
import { CustomerSignUpDto } from './dto/customer.signup';
import * as bcrypt from 'bcrypt';
import { CustomerRepository } from './customer.repository';
import { BaseService } from '../base/base.service';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  @InjectRepository(Customer)
  private customerRepository: CustomerRepository;

  hello = (): void => {
    // eslint-disable-next-line no-console
    console.log('chao');
  };

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async signUpCustomer(data: CustomerSignUpDto): Promise<Customer> {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(data.password, salt);
    data.status = 'active';
    data.level = 0;
    data.password = password;
    const customer: Customer = await this.customerRepository.signUp(data);
    return customer;
  }
}
