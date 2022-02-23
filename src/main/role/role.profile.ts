import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import Role from './role.entity';
import { RoleDTO } from './dto/role.dto';

@Injectable()
export class RoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper: Mapper): void => {
      mapper.createMap(Role, RoleDTO);
    };
  }
}
