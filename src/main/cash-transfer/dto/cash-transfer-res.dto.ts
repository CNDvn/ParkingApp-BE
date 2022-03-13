import { AutoMap } from '@automapper/classes';
import BankDto from 'src/main/bank/dto/bank.dto';
import { BaseDto } from 'src/main/base/base.dto';
import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import Bank from '../../bank/bank.entity';
import Transaction from '../../transaction/transaction.entity';
import User from '../../user/user.entity';
export class CashTransferResDto extends BaseDto {
  @AutoMap()
  public amount: number;

  @AutoMap({ typeFn: () => BankDto })
  public bank: BankDto;
}
