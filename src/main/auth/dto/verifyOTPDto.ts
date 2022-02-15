import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VerifyBase {
  @ApiProperty()
  @IsNotEmpty()
  otp: number;
}
export class VerifyOTPDto extends VerifyBase {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
