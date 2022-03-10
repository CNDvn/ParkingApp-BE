import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Payment from './payment.entity';
import { PaymentRepository } from './payment.repository';
import Booking from '../booking/booking.entity';
import Wallet from '../wallet/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import Transaction from '../transaction/transaction.entity';
import { BookingService } from '../booking/booking.service';
import User from '../user/user.entity';
import { ParkingService } from '../parking/parking.service';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  constructor(
    private paymentRepository: PaymentRepository,
    private walletService: WalletService,
    @Inject(forwardRef(() => BookingService))
    private bookService: BookingService,
    private parkingService: ParkingService,
    private userService: UserService,
    private transactionService: TransactionService,
  ) {
    super(paymentRepository);
  }

  async createPayment(booking: Booking, wallet: Wallet): Promise<Payment> {
    const endTime = new Date();
    const diff = Math.abs(endTime.getTime() - booking.startTime.getTime());
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const amount = hours * booking.price; //cần làm lại cho đúng thuật toán tính tiền

    if (amount > wallet.frozenMoney + wallet.currentBalance)
      throw new BadRequestException(
        'There is not enough money in your wallet for checkout',
      );

    return await this.paymentRepository.save({
      booking: booking,
      endTime: endTime,
      amount: amount,
    });
  }

  async payment(bookingId: string, user: User): Promise<Transaction> {
    const booking = await this.bookService.getByIdWithRelations(bookingId, [
      'service',
      'parking',
      'parkingSlot',
      'payments',
      'car',
    ]);
    const walletCustomer = await this.walletService.getWalletMe(user.id);
    const business = (
      await this.parkingService.findByIdAndRelations(booking.parking.id, [
        'business',
      ])
    ).business;

    const walletBusiness = await this.walletService.getWalletMe(
      (
        await this.userService.findUserByBusiness(business)
      ).id,
    );

    return await this.transactionService.createTransaction(
      walletCustomer,
      walletBusiness,
      booking.payment,
      booking,
    );
  }
}
