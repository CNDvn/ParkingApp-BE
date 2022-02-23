import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RoleCreateDTO } from './dto/role.create.dto';
import { RoleService } from './role.service';
import Role from './role.entity';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { MapInterceptor } from '@automapper/nestjs';
import { RoleDTO } from './dto/role.dto';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  // @UseGuards(LocalAuthGuard)
  @ApiBody({ type: RoleCreateDTO })
  @UseInterceptors(MapInterceptor(RoleDTO, Role))
  async createRole(@Body() roleCreateDTO: RoleCreateDTO): Promise<Role> {
    return await this.roleService.createData(roleCreateDTO);
  }

  @Get()
  @Roles(RoleEnum.ADMIN)
  @UseInterceptors(MapInterceptor(RoleDTO, Role, { isArray: true }))
  async getRole(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }
}
