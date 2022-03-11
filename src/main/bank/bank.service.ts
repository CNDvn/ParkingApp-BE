import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Bank from './bank.entity';
import { BankRepository } from './bank.repository';
import BankDto from './dto/bank.dto';

@Injectable()
export class BankService extends BaseService<Bank> {
  constructor(private bankRepository: BankRepository) {
    super(bankRepository);
  }

  async addBank(bank: BankDto): Promise<Bank> {
    return await this.bankRepository.save({
      name: bank.name,
      bankCode: bank.bankCode,
    });
  }

  async getByBankCode(bankCode: string): Promise<Bank> {
    return await this.bankRepository.findOne({ where: { bankCode: bankCode } });
  }
}
