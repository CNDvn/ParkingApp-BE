import { Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CashTransferCreateDto {
  @ApiProperty({ name: 'amount' })
  public amount: number;

  @ApiProperty({ name: 'bankId' })
  public bankId: string;
}
