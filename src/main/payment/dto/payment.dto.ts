import { ApiProperty } from '@nestjs/swagger';
export class PaymentDto {
  @ApiProperty({ name: 'amount' })
  public amount: string;
  @ApiProperty({ name: 'type' })
  public type: string;
}
