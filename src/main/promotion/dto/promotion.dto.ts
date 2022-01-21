import { ApiProperty } from '@nestjs/swagger';
export class PromotionDto {
  @ApiProperty({ name: 'code' })
  public code: string;
  @ApiProperty({ name: 'percent' })
  public percent: number;
  @ApiProperty({ name: 'description' })
  public description: string;
  @ApiProperty({ name: 'status' })
  public status: string;
}
