import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Payment from './payment.entity';
import { PaymentRepository } from './payment.repository';
import Booking from '../booking/booking.entity';
import Wallet from '../wallet/wallet.entity';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  constructor(private paymentRepository: PaymentRepository) {
    super(paymentRepository);
  }

  async createPayment(booking: Booking, wallet: Wallet): Promise<Payment> {
    const endTime = new Date();
    const diff = Math.abs(endTime.getTime() - booking.startTime.getTime());
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const amount = hours * booking.price;

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
}
