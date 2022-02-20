import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VerifyBase {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'otp must number' })
  otp: number;
}
export class VerifyOTPDto extends VerifyBase {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
