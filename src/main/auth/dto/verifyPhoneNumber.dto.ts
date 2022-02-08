import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Validate } from 'class-validator';
import { IsPhoneNumberVN } from '../../../validator/isPhoneNumber.validation';

export class VerifyPhoneNumberDto {
  @ApiProperty()
  @Validate(IsPhoneNumberVN)
  phoneNumber: string;

  @IsNumber()
  @ApiProperty()
  verifyCode: number;
}
