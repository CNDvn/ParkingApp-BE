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
import { DeleteResult } from 'typeorm';
import { Public } from '../auth/public';
import Customer from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @Public()
  async createCustomer(@Body() createCustomer: CustomerDto): Promise<Customer> {
    return await this.customerService.createData(createCustomer);
  }

  @Get()
  @Public()
  async getAllCustomer(): Promise<Customer[]> {
    return await this.customerService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomer: CustomerDto,
  ): Promise<Customer> {
    return await this.customerService.update(id, updateCustomer);
  }

  @Delete('/:id')
  @Public()
  async deleteCustomer(@Param('id') id: string): Promise<DeleteResult> {
    return await this.customerService.deleteById(id);
  }
}
