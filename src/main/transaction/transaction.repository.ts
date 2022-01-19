import { EntityRepository, Repository } from 'typeorm';
import Transaction from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}
