import { DeleteResult } from 'typeorm';
import { TransactionDto } from './dto/transaction.dto';
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
import { TransactionService } from './transaction.service';
import { Public } from '../auth/public';
import Transaction from './transaction.entity';
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @Public()
  async createTransaction(
    @Body() createTransaction: TransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.createData(createTransaction);
  }

  @Get()
  @Public()
  async getAllTransaction(): Promise<Transaction[]> {
    return await this.transactionService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateTransactionById(
    @Param('id') id: string,
    @Body() updateTransaction: TransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.update(id, updateTransaction);
  }

  @Delete('/:id')
  @Public()
  async deleteTransactionById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.transactionService.deleteById(id);
  }
}
