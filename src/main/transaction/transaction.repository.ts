import { HttpException, HttpStatus } from '@nestjs/common';
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
      walletCustomer = await queryRunner.manager.save<Wallet>(walletCustomer);
      walletBusiness = await queryRunner.manager.save<Wallet>(walletBusiness);

      const a = queryRunner.manager.create(Transaction, {
        amount: transaction.amount,
        payment: transaction.payment,
        walletForm: walletCustomer,
        walletTo: walletBusiness,
      });
      const result = await queryRunner.manager.save<Transaction>(a);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in Booking repository');
      // eslint-disable-next-line no-console
      console.log(error);
      throw new HttpException(
        'The transaction failed!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
