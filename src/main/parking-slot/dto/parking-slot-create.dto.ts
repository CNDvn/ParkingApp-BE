import { ApiProperty } from '@nestjs/swagger';
import { Length, Max, Min, Validate } from 'class-validator';
import { IsNotBlank } from 'src/validator/is-not-blank.validation';

export class ParkingSlotCreate {
  @Validate(IsNotBlank)
  @Length(1, 2)
  @ApiProperty({ type: String, description: 'prefixName' })
  public prefixName: string;
}

export class ParkingSlotCreateExtends extends ParkingSlotCreate {
  @Min(1)
  @Max(50)
  @ApiProperty({ type: Number, description: 'amount', default: 10 })
  public amount: number;
}
