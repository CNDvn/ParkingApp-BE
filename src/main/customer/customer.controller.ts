import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public';
import Customer from './customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post()
  @Public()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  @Public()
  async getAll(): Promise<Customer[]> {
    return await this.customerService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return await this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('/:id')
  @Public()
  async deleteCustomer(@Param('id') id: string): Promise<Customer> {
    return await this.customerService.deleteCustomer(id);
  }
}
