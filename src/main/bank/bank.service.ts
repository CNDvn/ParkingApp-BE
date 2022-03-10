import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Bank from './bank.entity';
import { BankRepository } from './bank.repository';
import { BankDto } from './dto/bank.dto';

@Injectable()
export class BankService extends BaseService<Bank> {
  constructor(private transferTypeRepository: BankRepository) {
    super(transferTypeRepository);
  }

  async addType(bank: BankDto): Promise<Bank> {
    return await this.transferTypeRepository.save({
      name: bank.name,
      bankCode: bank.bankCode,
    });
  }
}
