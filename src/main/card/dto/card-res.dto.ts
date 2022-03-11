import { AutoMap } from '@automapper/classes';
import BankDto from 'src/main/bank/dto/bank.dto';
import { BaseDto } from 'src/main/base/base.dto';
export class CardResDto extends BaseDto {
  @AutoMap()
  public dateValidFrom: string;

  @AutoMap()
  public cardNumber: string;

  @AutoMap()
  public cardHolder: string;

  @AutoMap({ typeFn: () => BankDto })
  public bank: BankDto;
}
