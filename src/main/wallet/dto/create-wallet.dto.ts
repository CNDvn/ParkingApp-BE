import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WalletCreateDTO {
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'currentBalance' })
  currentBalance: number;
}
