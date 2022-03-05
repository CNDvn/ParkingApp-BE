import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WalletUpdateDTO {
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: 'amountMoney' })
  amountMoney: number;
}
