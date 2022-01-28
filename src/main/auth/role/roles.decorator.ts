import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RoleEnum } from './role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]): CustomDecorator =>
  SetMetadata(ROLES_KEY, roles);
