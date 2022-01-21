import { ApiProperty } from '@nestjs/swagger';
export class ParkingSlotDto {
  @ApiProperty({ name: 'locationName' })
  public locationName: string;
  @ApiProperty({ name: 'status' })
  public status: string;
}
