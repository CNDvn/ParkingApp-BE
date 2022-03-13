import { EntityRepository, getConnection, Repository } from 'typeorm';
import CashTransfer from './cash-transfer.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VnpayDto } from '../vnpay/vnpay.dto';
import Transaction from '../transaction/transaction.entity';
import User from '../user/user.entity';
import Wallet from '../wallet/wallet.entity';

@EntityRepository(CashTransfer)
export class CashTransferRepository extends Repository<CashTransfer> {
  async createCashTransfer(
    vnpayDto: VnpayDto,
    user: User,
  ): Promise<CashTransfer> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const cashTransfer = await queryRunner.manager.save<CashTransfer>(
        queryRunner.manager.create<CashTransfer>(CashTransfer, {
          bankCode: vnpayDto.vnp_BankCode,
          user: user,
          amount: parseFloat(vnpayDto.vnp_Amount),
          bankTranNo: vnpayDto.vnp_BankTranNo,
          cardType: vnpayDto.vnp_CardType,
          orderInfo: vnpayDto.vnp_OrderInfo,
          payDate: vnpayDto.vnp_PayDate,
          transactionNo: vnpayDto.vnp_TransactionNo,
          transactionStatus: vnpayDto.vnp_TransactionStatus,
        }),
      );

      await queryRunner.manager.save<Transaction>(
        queryRunner.manager.create<Transaction>(Transaction, {
          amount: cashTransfer.amount,
          cashTransfer: cashTransfer,
          walletTo: user.wallet,
          description: `${user.id} transfers money to wallet ${user.wallet.id}`,
        }),
      );

      user.wallet.currentBalance =
        parseFloat(user.wallet.currentBalance.toString()) +
        parseFloat(vnpayDto.vnp_Amount) / 100;
      await queryRunner.manager.save<Wallet>(user.wallet);

      await queryRunner.commitTransaction();
      return cashTransfer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // eslint-disable-next-line no-console
      console.log('error transaction in Car repository');
      // eslint-disable-next-line no-console
      console.log(error);
      throw new HttpException(
        'Wallet recharge failed, please contact system admin for support',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
