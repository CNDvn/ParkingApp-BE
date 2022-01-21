import { ApiProperty } from '@nestjs/swagger';
export class TransactionDto {
  @ApiProperty({ name: 'date' })
  public date: Date;
  @ApiProperty({ name: 'amount' })
  public amount: number;
}
