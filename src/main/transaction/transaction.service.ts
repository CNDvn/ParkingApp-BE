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
      const addToDB = async (): Promise<Transaction> => {
        const priceReturn = priceFiveHours - amount;
        await this.walletService.update(walletCustomer.id, {
          frozenMoney: +walletCustomer.frozenMoney - amount - priceReturn,
          currentBalance: +walletCustomer.currentBalance + priceReturn,
        });
        await this.walletService.update(walletBusiness.id, {
          currentBalance: +walletBusiness.currentBalance + amount,
        });

        return await this.transactionRepository.save({
          amount: amount,
          payment: payment,
          walletForm: walletCustomer,
          walletTo: walletBusiness,
        });
      };
      return await this.transactionRepository.transaction(addToDB);
    }

    if (+walletCustomer.currentBalance + priceFiveHours >= amount) {
      const addToDB = async (): Promise<Transaction> => {
        const remainingAmount = +amount - priceFiveHours;
        await this.walletService.update(walletCustomer.id, {
          frozenMoney: +walletCustomer.frozenMoney - priceFiveHours,
          currentBalance: +walletCustomer.currentBalance - remainingAmount,
        });
        await this.walletService.update(walletBusiness.id, {
          currentBalance: +walletBusiness.currentBalance + amount,
        });

        return await this.transactionRepository.save({
          amount: amount,
          payment: payment,
          walletForm: walletCustomer,
          walletTo: walletBusiness,
        });
      };
      return await this.transactionRepository.transaction(addToDB);
    }

    if (+walletCustomer.currentBalance + priceFiveHours < amount) {
      throw new BadRequestException(
        'There is not enough money in your wallet for checkout',
      );
    }

    throw new BadRequestException('Payment failed');
  }
}
