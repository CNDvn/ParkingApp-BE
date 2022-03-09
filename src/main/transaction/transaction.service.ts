import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Transaction from './transaction.entity';
import { TransactionRepository } from './transaction.repository';
import Wallet from '../wallet/wallet.entity';
import Payment from '../payment/payment.entity';
import Booking from '../booking/booking.entity';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TransactionService extends BaseService<Transaction> {
  constructor(
    private transactionRepository: TransactionRepository,
    private walletService: WalletService,
  ) {
    super(transactionRepository);
  }

  async createTransaction(
    walletCustomer: Wallet,
    walletBusiness: Wallet,
    payments: Payment[],
    booking: Booking,
  ): Promise<Transaction> {
    let amount = 0;
    payments.forEach((payment) => (amount += payment.amount));
    if (+walletCustomer.currentBalance + walletCustomer.frozenMoney < amount)
      throw new BadRequestException(
        'There is not enough money in your wallet for checkout',
      );
    const amountInFiveHours = +booking.price * 5;

    if (amountInFiveHours > amount) {
      const priceReturn = +amountInFiveHours - amount;
      const addToDB = async (): Promise<Transaction> => {
        await this.walletService.update(walletCustomer.id, {
          frozenMoney: +walletCustomer.frozenMoney - priceReturn - amount,
          currentBalance: +walletCustomer.currentBalance + priceReturn,
        });

        return null;
      };
    }

    return await null;
  }
}
