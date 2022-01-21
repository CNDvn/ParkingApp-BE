import { ApiProperty } from '@nestjs/swagger';
export class WalletDto {
  @ApiProperty({ name: 'totalPrice' })
  public totalPrice: number;
  @ApiProperty({ name: 'name' })
  public name: string;
}
