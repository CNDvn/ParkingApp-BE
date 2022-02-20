import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class PromotionCreateDTO {
  @IsNotEmpty()
  @MaxLength(15)
  @ApiProperty({
    type: String,
    description: 'Code',
  })
  public code: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Percent',
  })
  public percent: number;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Description',
  })
  public description: string;
}
