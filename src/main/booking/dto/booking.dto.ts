import { ApiProperty } from '@nestjs/swagger';
export class BookingDto {
  @ApiProperty({ name: 'startTime' })
  public startTime: Date;
  @ApiProperty({ name: 'endTime' })
  public endTime: Date;
  @ApiProperty({ name: 'status' })
  public status: string;
}
