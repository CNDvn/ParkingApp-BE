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
    payment: Payment,
    booking: Booking,
  ): Promise<Transaction> {
    const amount = payment.amount;
    if (+walletCustomer.currentBalance + walletCustomer.frozenMoney < amount)
      throw new BadRequestException(
        'There is not enough money in your wallet for checkout',
      );

    const priceFiveHours = booking.price * 5;

    if (priceFiveHours >= amount) {
      const priceReturn = priceFiveHours - amount;
      walletCustomer.frozenMoney =
        +walletCustomer.frozenMoney - amount - priceReturn;
      walletCustomer.currentBalance =
        +walletCustomer.currentBalance + priceReturn;

      walletBusiness.currentBalance = +walletBusiness.currentBalance + amount;

      const transaction: Transaction = new Transaction();
      transaction.amount = amount;
      transaction.payment = payment;
      transaction.walletForm = walletCustomer;
      transaction.walletTo = walletBusiness;
      return await this.transactionRepository.createTransaction(
        walletCustomer,
        walletBusiness,
        transaction,
      );
    }

    if (+walletCustomer.currentBalance + priceFiveHours >= amount) {
      const remainingAmount = +amount - priceFiveHours;
      walletCustomer.frozenMoney = +walletCustomer.frozenMoney - priceFiveHours;
      walletCustomer.currentBalance =
        +walletCustomer.currentBalance - remainingAmount;

      walletBusiness.currentBalance = +walletBusiness.currentBalance + amount;

      const transaction: Transaction = new Transaction();
      transaction.amount = amount;
      transaction.payment = payment;
      transaction.walletForm = walletCustomer;
      transaction.walletTo = walletBusiness;
      return await this.transactionRepository.createTransaction(
        walletCustomer,
        walletBusiness,
        transaction,
      );
    }

    if (+walletCustomer.currentBalance + priceFiveHours < amount) {
      throw new BadRequestException(
        'There is not enough money in your wallet for checkout',
      );
    }

    throw new BadRequestException('Payment failed');
  }
}
