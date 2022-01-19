import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Customer from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private customerRepository: Repository<Customer>;

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async getAll(): Promise<Customer[]> {
    return (await this.customerRepository.find()).filter(
      (customer) => customer.status === 'active',
    );
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ id });
    if (customer) {
      customer.firstName = updateCustomerDto.firstName;
      customer.lastName = updateCustomerDto.lastName;
      customer.DOB = updateCustomerDto.DOB;
      customer.phoneNumber = updateCustomerDto.phoneNumber;
      customer.address = updateCustomerDto.address;
      customer.status = updateCustomerDto.status;
      customer.level = updateCustomerDto.firstName;
      return await this.customerRepository.save(customer);
    }
    throw new HttpException('Not fount this customer', HttpStatus.NOT_FOUND);
  }

  async deleteCustomer(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ id });
    if (customer) {
      customer.status = 'inActive';
      return this.customerRepository.save(customer);
    }
    throw new HttpException('Not found customer', HttpStatus.NOT_FOUND);
  }
}
