import { IsNotBlank } from './../../../validator/is-not-blank.validation';
import { Validate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ServiceCreateDto {
  @ApiProperty({ type: String, description: 'name' })
  @Validate(IsNotBlank)
  public name: string;
  @ApiProperty({ type: String, description: 'description' })
  @Validate(IsNotBlank)
  public description: string;
  @ApiProperty({ type: Number, description: 'price' })
  @Validate(IsNotBlank)
  @IsNumber({}, { message: 'price must number' })
  public price: number;
  @ApiProperty({ type: String, description: 'parkingId' })
  @Validate(IsNotBlank)
  public parkingId: string;
}
