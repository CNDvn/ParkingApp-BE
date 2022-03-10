import { EntityRepository, getConnection, Repository } from 'typeorm';
import Wallet from '../wallet/wallet.entity';
import Transaction from './transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  async createTransaction(
    walletCustomer: Wallet,
    walletBusiness: Wallet,
    transaction: Transaction,
  ): Promise<Transaction> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      walletCustomer = await queryRunner.manager.save(walletCustomer);
      walletBusiness = await queryRunner.manager.save(walletBusiness);
      const result = await queryRunner.manager.save(transaction);
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
