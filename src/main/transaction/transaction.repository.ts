import { EntityRepository, getConnection, Repository } from 'typeorm';
import Transaction from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async transaction(fn: () => Promise<Transaction>): Promise<Transaction> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await fn();
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in Booking repository');
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }
}
