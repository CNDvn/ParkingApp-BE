import { ApiProperty } from '@nestjs/swagger';
export class ResetPasswordDto {
  @ApiProperty()
  username: string;
}
