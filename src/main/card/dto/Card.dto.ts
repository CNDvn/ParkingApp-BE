import { BaseDto } from '../../base/base.dto';
import Bank from '../../bank/bank.entity';

export class CardDto extends BaseDto {
  public amount: number;

  public dateValidFrom: string;

  public cardNumber: string;

  public cardHolder: string;

  public bank: Bank;
}
