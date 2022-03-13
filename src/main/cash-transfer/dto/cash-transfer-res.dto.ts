import { AutoMap } from '@automapper/classes';
import BankDto from 'src/main/bank/dto/bank.dto';
import { BaseDto } from 'src/main/base/base.dto';
export class CashTransferResDto extends BaseDto {
  @AutoMap()
  public amount: number;

  @AutoMap({ typeFn: () => BankDto })
  public bank: BankDto;
}
