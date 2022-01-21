import { DeleteResult } from 'typeorm';
import { CustomerPromotionDto } from './dto/customer-promotion.dto';
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
import { CustomerPromotionService } from './customer-promotion.service';
import CustomerPromotion from './customer-promotion.entity';

@ApiTags('Customer-promotion')
@Controller('customer-promotion')
export class CustomerPromotionController {
  constructor(
    private readonly customerPromotionService: CustomerPromotionService,
  ) {}

  @Post()
  @Public()
  async createCustomerPromotion(
    @Body() createCustomerPromotion: CustomerPromotionDto,
  ): Promise<CustomerPromotion> {
    return await this.customerPromotionService.createData(
      createCustomerPromotion,
    );
  }

  @Get()
  @Public()
  async getAllCustomerPromotion(): Promise<CustomerPromotion[]> {
    return await this.customerPromotionService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateCustomerPromotion(
    @Param('id') id: string,
    @Body() updateCustomerPromotion: CustomerPromotionDto,
  ): Promise<CustomerPromotion> {
    return await this.customerPromotionService.update(
      id,
      updateCustomerPromotion,
    );
  }

  @Delete('/:id')
  @Public()
  async deleteCustomerPromotion(
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    return await this.customerPromotionService.deleteById(id);
  }
}
