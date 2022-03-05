import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class WalletCreateDTO {
  @Min(0)
  @ApiProperty({ type: Number, description: 'currentBalance' })
  currentBalance: number;
}
