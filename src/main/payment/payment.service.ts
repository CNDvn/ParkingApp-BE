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
import { SharedService } from '../../shared/shared/shared.service';
import { StatusEnum } from '../../utils/status.enum';
import { CarService } from '../car/car.service';
import { ParkingSlotService } from '../parking-slot/parking-slot.service';

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
    private sharedService: SharedService,
    private carService: CarService,
    private parkingSlotService: ParkingSlotService,
  ) {
    super(paymentRepository);
  }

  async createPayment(booking: Booking, wallet: Wallet): Promise<Payment> {
    const endTime = new Date();
    const diff = Math.abs(endTime.getTime() - booking.startTime.getTime());
    const amount = this.sharedService.calculateTotalAmount(booking.price, diff);

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

  async updatePayment(
    idPayment: string,
    booking: Booking,
    wallet: Wallet,
  ): Promise<Payment> {
    const endTime = new Date();
    const diff = Math.abs(endTime.getTime() - booking.startTime.getTime());
    const amount = this.sharedService.calculateTotalAmount(booking.price, diff);

    if (amount > wallet.frozenMoney + wallet.currentBalance)
      throw new BadRequestException(
        'There is not enough money in your wallet for checkout',
      );

    return await this.paymentRepository.save({
      id: idPayment,
      endTime: endTime,
      amount: amount,
    });
  }

  async payment(bookingId: string, user: User): Promise<Transaction> {
    const booking = await this.bookService.getByIdWithRelations(bookingId, [
      'service',
      'parking',
      'parkingSlot',
      'payment',
      'car',
    ]);
    const walletCustomer = await this.walletService.getWalletMe(user.id);
    const business = (
      await this.parkingService.findByIdAndRelations(booking.parking.id, [
        'business',
      ])
    ).business;

    const userExist = await this.userService.findUserByBusiness(business);

    const walletBusiness = await this.walletService.getWalletMe(userExist.id);

    const transaction = await this.transactionService.createTransaction(
      walletCustomer,
      walletBusiness,
      booking.payment,
      booking,
    );

    if (transaction) {
      await this.bookService.update(booking.id, { status: StatusEnum.PAID });
      await this.carService.update(booking.car.id, {
        status: StatusEnum.ACTIVE,
      });
      await this.parkingSlotService.update(booking.parkingSlot.id, {
        status: StatusEnum.EMPTY,
      });
    }

    return transaction;
  }
}
