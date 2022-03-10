import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../base/base.dto';
import { AutoMap } from '@automapper/classes';

export class BankDto extends BaseDto {
  @ApiProperty({ name: 'name' })
  @AutoMap()
  public name: string;

  @ApiProperty({ name: 'bankId' })
  @AutoMap()
  public bankId: string;
}
