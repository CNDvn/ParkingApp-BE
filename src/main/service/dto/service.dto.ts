import { ApiProperty } from '@nestjs/swagger';
export class ServiceDto {
  @ApiProperty({ name: 'name' })
  public name: string;
  @ApiProperty({ name: 'description' })
  public description: string;
  @ApiProperty({ name: 'price' })
  public price: number;
  @ApiProperty({ name: 'status' })
  public status: string;
}
