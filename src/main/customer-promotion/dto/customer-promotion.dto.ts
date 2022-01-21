import { ApiProperty } from '@nestjs/swagger';
export class CustomerPromotionDto {
  @ApiProperty({ name: 'status' })
  public status: string;
}
