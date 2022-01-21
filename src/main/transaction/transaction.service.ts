import { TransactionRepository } from './transaction.repository';
import { BaseService } from './../base/base.service';
import { Injectable } from '@nestjs/common';
import Transaction from './transaction.entity';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(private transactionRepository: TransactionRepository) {
    super(transactionRepository);
  }
}
