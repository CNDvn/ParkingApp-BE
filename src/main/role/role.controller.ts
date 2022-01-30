import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RoleCreateDTO } from './dto/role.create.dto';
import { RoleService } from './role.service';
import Role from './role.entity';
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('/')
  // @UseGuards(LocalAuthGuard)
  @ApiBody({ type: RoleCreateDTO })
  async createRole(@Body() roleCreateDTO: RoleCreateDTO): Promise<Role> {
    return await this.roleService.createData(roleCreateDTO);
  }
}
