import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../role/role.enum';

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
}
