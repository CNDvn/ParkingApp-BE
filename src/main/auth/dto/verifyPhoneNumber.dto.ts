import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, Validate } from 'class-validator';
import { IsPhoneNumberVN } from '../../../validator/isPhoneNumber.validation';

export class VerifyPhoneNumberDto {
  @ApiProperty()
  @Validate(IsPhoneNumberVN)
  phoneNumber: string;

  @IsNumber()
  @Min(100000)
  @Max(999999)
  @ApiProperty()
  verifyCode: number;
}
