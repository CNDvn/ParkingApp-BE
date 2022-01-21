import { ApiProperty } from '@nestjs/swagger';
export class PriceListDto {
  @ApiProperty({ name: 'name' })
  public name: string;
}
