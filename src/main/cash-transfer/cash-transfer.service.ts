import { BankService } from './../bank/bank.service';
import { CashTransferCreateDto } from './dto/cash-transfer-create.dto';
import { CashTransferRepository } from './cash-transfer.repository';
import { BaseService } from './../base/base.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import CashTransfer from './cash-transfer.entity';
import User from '../user/user.entity';
import { VnpayService } from '../vnpay/vnpay.service';
import { VnpayDto } from '../vnpay/vnpay.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class CashTransferService extends BaseService<CashTransfer> {
  constructor(
    private cashTransferRepository: CashTransferRepository,
    private bankService: BankService,
    private vnpayService: VnpayService,
    private configService: ConfigService,
    private userService: UserService,
    private transactionService: TransactionService,
  ) {
    super(cashTransferRepository);
  }

  async transferIntoWallet(
    user: User,
    dto: CashTransferCreateDto,
    ip: string,
  ): Promise<string> {
    const bank = await this.bankService.findById(dto.bankId);
    if (!bank) throw new BadRequestException("We don't support this Bank");
    const orderInfo = `${user.id} transfer cash into wallet`;
    const result = this.vnpayService.payment(
      ip,
      dto.amount,
      bank.bankCode,
      orderInfo,
      'other',
      '',
    );
    return result;
  }

  async transferReturn(
    vnpayDto: VnpayDto,
  ): Promise<{ message: string; code: string }> {
    // kiem tra trong DB xem transaction nay da ton tai chua trong bang cashTransfer tai cot TransactionNo
    const cashTransferInDB = await this.cashTransferRepository.findOne({
      where: { transactionNo: vnpayDto.vnp_TransactionNo },
    });
    // neu co cashTransfer chung to user dang request lan 2 de tu tang tien
    if (cashTransferInDB)
      throw new BadRequestException('This transaction invalid');

    const result = this.vnpayService.vnpayReturn(vnpayDto);
    if (!result || result.message !== 'success')
      throw new BadRequestException('You can not transfer cash to your wallet');

    // them thong tin transaction nay vao DB tai bang cashTransfer
    const userId = vnpayDto.vnp_OrderInfo.split(' ')[0];
    const user = await this.userService.findByIdWithRelations(userId, [
      'wallet',
    ]);
    if (!user)
      throw new BadRequestException(
        'We are unable to locate the money order, please contact the system admin for assistance',
      );
    if (!user.wallet)
      throw new BadRequestException(
        'You do not have a wallet, please contact the system admin to report',
      );

    const cashTransfer = await this.cashTransferRepository.createCashTransfer(
      vnpayDto,
      user,
    );

    if (!cashTransfer)
      throw new BadRequestException(
        'Wallet recharge failed, please contact system admin for support',
      );

    return result;
  }
}
