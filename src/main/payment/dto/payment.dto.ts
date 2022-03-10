import { AutoMap } from '@automapper/classes';
import { BaseDto } from '../../base/base.dto';

export class PaymentDto extends BaseDto {
  @AutoMap()
  public amount: number;

  @AutoMap()
  public endTime: Date;
}
