import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({ name: 'username' })
  public username: string;
  @ApiProperty({ name: 'password' })
  public password: string;
}
