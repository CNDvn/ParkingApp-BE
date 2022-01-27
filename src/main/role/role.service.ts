import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Role from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(private roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
