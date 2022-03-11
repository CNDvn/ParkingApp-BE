import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';

export default class BankDto extends BaseDto {
  @ApiProperty({ name: 'name' })
  @AutoMap()
  public name: string;

  @ApiProperty({ name: 'bankCode' })
  @AutoMap()
  public bankCode: string;
}
