import { BankDto } from '../../bank/dto/bank.dto';
import { BaseDto } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';

export class CardDto extends BaseDto {
  @AutoMap()
  public dateValidFrom: string;

  @AutoMap()
  public cardNumber: string;

  @AutoMap()
  public cardHolder: string;

  @AutoMap({ typeFn: () => BankDto })
  public bank: BankDto;
}
