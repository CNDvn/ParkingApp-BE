import { ApiProperty } from '@nestjs/swagger';
export class PriceListDetailDto {
  @ApiProperty({ name: 'priceTwoHours' })
  public priceTwoHours: number;
  @ApiProperty({ name: 'price' })
  public price: number;
}
