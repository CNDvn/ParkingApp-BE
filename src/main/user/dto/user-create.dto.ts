import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'firstName' })
  public firstName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'lastName' })
  public lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    description: 'dateOfBirth',
    default: new Date().toISOString().slice(0, 10),
  })
  public DOB: Date;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'userName' })
  public username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  public password: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phoneNumber' })
  public phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  public email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'address' })
  public address: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'avatar' })
  public avatar: string;
}
