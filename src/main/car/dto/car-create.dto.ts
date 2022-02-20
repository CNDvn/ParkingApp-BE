import { ApiProperty } from '@nestjs/swagger';

export class CarCreateDto {
  @ApiProperty({ type: String, description: 'nPlates' })
  public nPlates: string;
  @ApiProperty({ type: String, description: 'brand' })
  public brand: string;
  @ApiProperty({ type: String, description: 'color' })
  public color: string;
  @ApiProperty({ type: String, description: 'modelCode' })
  public modelCode: string;
  @ApiProperty({ type: String, description: 'typeCarId' })
  public typeCarId: string;
  @ApiProperty({ type: [String], description: 'imageIds' })
  public images: string[];
}
