import { number } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMilitaryTime,
  IsNotEmpty,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsBeforeConstraint } from 'src/validator/isBefore.validation';
import { IsPhoneNumberVN } from 'src/validator/isPhoneNumber.validation';
export class Coordinate {
  @Min(-90)
  @Max(90)
  @ApiProperty({
    type: number,
    description: 'latitude of location',
    default: 70,
  })
  public latitude: number;

  @Min(-180)
  @Max(180)
  @ApiProperty({
    type: number,
    description: 'longitude of location',
    default: 150,
  })
  public longitude: number;
}
export class ParkingCreateDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'name' })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'address' })
  public address: string;

  @Validate(IsBeforeConstraint, ['closeTime'])
  @IsMilitaryTime({ message: 'OpenTime time in the format HH:MM' })
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'OpenTime 09:00',
    default: '09:00',
  })
  public openTime: string;

  @IsMilitaryTime({ message: 'CloseTime time in the format HH:MM' })
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'CloseTime 12:00PM',
    default: '12:00',
  })
  public closeTime: string;

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
