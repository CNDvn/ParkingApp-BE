import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsPhoneNumberVN } from 'src/validator/isPhoneNumber.validation';
class Coordinate {
  @Min(-90)
  @Max(90)
  @ApiProperty({
    type: String,
    description: 'longitude of location',
  })
  public longitude: number;

  @Min(-180)
  @Max(180)
  @ApiProperty({
    type: String,
    description: 'latitude of location',
  })
  public latitude: number;
}
export class ParkingCreateDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'address' })
  public address: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'openTime 09:00:00',
    default: '09:00:00',
  })
  public openTime: Date;

  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'openTime 12:00PM',
    default: '12:00:00',
  })
  public closeTime: Date;

  @IsNotEmpty()
  @Validate(IsPhoneNumberVN)
  @ApiProperty({
    type: String,
    description: 'phone number',
  })
  public phoneNumber: string;

  @ValidateNested()
  @ApiProperty({
    type: Coordinate,
    description: 'Coordinate',
  })
  @Type(() => Coordinate)
  coordinate: Coordinate;
}
