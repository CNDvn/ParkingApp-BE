import { OmitType } from '@nestjs/swagger';
import { UserCreateDto } from './user-create.dto';

export class UserUpdateProfileDto extends OmitType(UserCreateDto, [
  'username',
] as const) {}
