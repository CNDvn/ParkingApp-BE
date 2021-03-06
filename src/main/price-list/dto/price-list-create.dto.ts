import { ApiProperty } from '@nestjs/swagger';
import { Min, Validate } from 'class-validator';
import { IsNotBlank } from 'src/validator/is-not-blank.validation';

export class PriceListDetail {
  @Validate(IsNotBlank)
  @ApiProperty({ type: String, description: 'typeCarID' })
  public typeCarId: string;

  @Min(0)
  @ApiProperty({ type: Number, description: 'price' })
  public price: number;
}
export class PriceListCreate {
  @Validate(IsNotBlank)
  @ApiProperty({ type: String, description: 'name' })
  public name: string;

  @ApiProperty({ type: [PriceListDetail], description: 'priceListDetails' })
  public priceListDetails: PriceListDetail[];
}
