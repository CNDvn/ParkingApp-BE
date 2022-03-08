import { EntityRepository, Repository, getConnection } from 'typeorm';
import Booking from './booking.entity';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async transactionCustom(fn: () => Promise<Booking>): Promise<Booking> {
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
