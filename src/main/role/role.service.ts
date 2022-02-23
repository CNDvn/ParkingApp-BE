import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import Role from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(private roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async findByNameRole(roleName: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name: roleName } });
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
