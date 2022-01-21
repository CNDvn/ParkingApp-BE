import { ApiProperty } from '@nestjs/swagger';
export class CarDto {
  @ApiProperty({ name: 'nPlates' })
  nPlates: string;
  @ApiProperty({ name: 'brand' })
  public brand: string;
  @ApiProperty({ name: 'color' })
  public color: string;
  @ApiProperty({ name: 'model' })
  public modelCode: string;
  @ApiProperty({ name: 'status' })
  public status: string;
}
