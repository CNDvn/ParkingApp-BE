import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.enum';

export class LoginDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ enum: Role })
  role: Role;
}
