import { MapInterceptor } from '@automapper/nestjs';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import UserDTO from './user.dto';
import User from './user.entity';
import { UserService } from './user.service';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseInterceptors(MapInterceptor(UserDTO, User))
  @ApiResponse({
    status: 200,
    description: 'Get Profile',
  })
  async getMe(@GetUser() user: User): Promise<User> {
    return await this.userService.getMe(user);
  }
}
