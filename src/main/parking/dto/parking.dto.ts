import { ApiProperty } from '@nestjs/swagger';
export class ParkingDto {
  @ApiProperty({ name: 'address' })
  public address: string;
  @ApiProperty({ name: 'longitude' })
  public longitude: number;
  @ApiProperty({ name: 'latitude' })
  public latitude: number;
  @ApiProperty({ name: 'openTime' })
  public openTime: Date;
  @ApiProperty({ name: 'closeTime' })
  public closeTime: Date;
  @ApiProperty({ name: 'status' })
  public status: string;
}
