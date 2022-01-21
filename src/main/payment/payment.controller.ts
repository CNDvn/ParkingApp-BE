import { DeleteResult } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from '../auth/public';
import Payment from './payment.entity';
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Public()
  async createPayment(@Body() createPayment: PaymentDto): Promise<Payment> {
    return await this.paymentService.createData(createPayment);
  }

  @Get()
  @Public()
  async getAllPayment(): Promise<Payment[]> {
    return await this.paymentService.getAll();
  }

  @Put('/:id')
  @Public()
  async updatePaymentById(
    @Param('id') id: string,
    @Body() updatePayment: PaymentDto,
  ): Promise<Payment> {
    return await this.paymentService.update(id, updatePayment);
  }

  @Delete('/:id')
  @Public()
  async deletePaymentById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.paymentService.deleteById(id);
  }
}
