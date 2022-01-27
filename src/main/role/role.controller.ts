import { LocalAuthGuard } from './../auth/local-auth/local-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public';
import { RoleCreateDTO } from './dto/role.create.dto';
import { RoleService } from './role.service';
import Role from './role.entity';
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('/')
  @Public()
  // @UseGuards(LocalAuthGuard)
  @ApiBody({ type: RoleCreateDTO })
  async createRole(@Body() roleCreateDTO: RoleCreateDTO): Promise<Role> {
    console.log(roleCreateDTO);
    return await this.roleService.createData(roleCreateDTO);
  }
}
