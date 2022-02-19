import { ApiProperty } from '@nestjs/swagger';
export class ServiceCreateDto {
  @ApiProperty({ type: String, description: 'name' })
  public name: string;
  @ApiProperty({ type: String, description: 'description' })
  public description: string;
  @ApiProperty({ type: Number, description: 'price' })
  public price: number;
  @ApiProperty({ type: String, description: 'parkingId' })
  public parkingId: string;
}
