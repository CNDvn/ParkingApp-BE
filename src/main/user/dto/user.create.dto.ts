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
  @ApiProperty({ type: Date, description: 'dateOfBirth' })
  public DOB: string;

  // @IsNotEmpty()
  // @ApiProperty({ type: String, description: 'status', default: 'active' })
  public status: string;

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
}
