import { StatusEnum } from './../../utils/status.enum';
import { EntityRepository, Repository, getConnection } from 'typeorm';
import Car from '../car/car.entity';
import Booking from './booking.entity';
import Wallet from '../wallet/wallet.entity';
import ParkingSlot from '../parking-slot/parking-slot.entity';

@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {
  async checkIn(car: Car, booking: Booking): Promise<Booking> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      car.status = StatusEnum.IN_PARKING;
      car = await queryRunner.manager.save(car);
      booking.checkinTime = new Date();
      booking.status = StatusEnum.CHECK_IN;
      const result = await queryRunner.manager.save(booking);
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

  async bookSlot(
    wallet: Wallet,
    parkingSlot: ParkingSlot,
    car: Car,
    booking: Booking,
  ): Promise<Booking> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      wallet = await queryRunner.manager.save(wallet);
      parkingSlot = await queryRunner.manager.save(parkingSlot);
      car = await queryRunner.manager.save(car);
      const result = await queryRunner.manager.save(booking);
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

  async cancel(booking: Booking, intervalBooking: number): Promise<Booking> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (intervalBooking > 2) {
        await queryRunner.manager.save(booking.payment);
      } else {
        await queryRunner.manager.save<Car>(booking.car);
        await queryRunner.manager.save<Wallet>(
          booking.car.customer.user.wallet,
        );
        await queryRunner.manager.save(booking.parkingSlot);
      }
      const result = await queryRunner.manager.save<Booking>(booking);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in Booking repository (cancel feature)');
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }
}
