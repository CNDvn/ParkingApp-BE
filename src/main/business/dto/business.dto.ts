import { ApiProperty } from '@nestjs/swagger';
export class BusinessDto {
  @ApiProperty({ name: 'firstName' })
  public firstName: string;
  @ApiProperty({ name: 'lastName' })
  public lastName: string;
  @ApiProperty({ name: 'DOB', type: Date, format: 'date' })
  public DOB: Date;
  @ApiProperty({ name: 'phoneNumber' })
  public phoneNumber: string;
  @ApiProperty({ name: 'address' })
  public address: string;
  @ApiProperty({ name: 'emailAddress' })
  public emailAddress: string;
  @ApiProperty({ name: 'status' })
  public status: string;
}
