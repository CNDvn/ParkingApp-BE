import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import UserDTO from './user.dto';
import User from './user.entity';
import { UserService } from './user.service';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum } from '../auth/role/role.enum';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';

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

  @Roles(RoleEnum.ADMIN)
  @Get('/getAll')
  @UseInterceptors(MapInterceptor(UserDTO, User, { isArray: true }))
  @ApiResponse({
    status: 200,
    description: 'Get all Users',
  })
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Patch('updateProfile')
  @ApiResponse({
    status: 200,
    description: 'Update Profile',
  })
  async updateProfile(
    @GetUser() user: User,
    @Body() data: UserUpdateProfileDto,
  ): Promise<string> {
    return await this.userService.updateUser(user.id, data);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch('updateUser/:id')
  @ApiResponse({
    status: 200,
    description: 'Update User',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserUpdateProfileDto,
  ): Promise<string> {
    return await this.userService.updateUser(id, data);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch('delete/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete User',
  })
  async deleteUser(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    return await this.userService.deleteUser(user, id);
  }
}
