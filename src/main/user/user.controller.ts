import { MapInterceptor } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/decorator/getUser.decorator';
import UserDTO from './user.dto';
import User from './user.entity';
import { UserService } from './user.service';
import { Roles } from '../auth/role/roles.decorator';
import { RoleEnum, RoleSortEnum } from '../auth/role/role.enum';
import { UserUpdateProfileDto } from './dto/user-update-profile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor } from 'src/interceptor/file.interceptor';
import { BaseMultipleFile } from '../base/base.images.dto';
import {
  FilterPaginationBase,
  IPaginateResponse,
  paginateResponse,
} from '../base/filter.pagnigation';
import { StatusSortEnum } from 'src/utils/status.enum';
import { ApiListResponse } from 'src/decorator/apiPaginateResponse.decorator';
import { UserSortEnum } from './user.enum';
import { StatusUser } from './dto/user-update-status.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseInterceptors(MapInterceptor(UserDTO, User))
  @ApiResponse({
    status: 200,
    description: 'Get Profile',
  })
  async getMe(@GetUser() user: User): Promise<User> {
    if (user.role.name === RoleEnum.ADMIN) {
      return user;
    }
    return await this.userService.getMe(user);
  }

  // @Roles(RoleEnum.ADMIN)
  // @Get()
  // @UseInterceptors(MapInterceptor(UserDTO, User, { isArray: true }))
  // @ApiResponse({
  //   status: 200,
  //   description: 'Get all Users',
  // })
  // async getAllUsers(): Promise<User[]> {
  //   return await this.userService.getAll();
  // }

  @Put('profile')
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

  @Put('/:id/status')
  @ApiQuery({ name: 'status', enum: StatusUser })
  @ApiResponse({
    status: 200,
    description: 'Ban User And Active User',
  })
  async updateStatus(
    @Query('status') status: StatusUser = StatusUser.BAN,
    @Param('id') id: string,
  ): Promise<string> {
    return await this.userService.updateStatusUser(id, status);
  }

  @Put('avatar')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image'), new FileToBodyInterceptor())
  @ApiResponse({
    status: 200,
    description: 'Update avatar success',
  })
  async updateAvatar(
    @GetUser() user: User,
    @Body() image: BaseMultipleFile,
  ): Promise<string> {
    return await this.userService.updateAvatar(user.id, image);
  }

  @Roles(RoleEnum.ADMIN)
  @Put('/:id')
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
  @Delete('/:id')
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

  @Roles(RoleEnum.ADMIN)
  @Get()
  @ApiQuery({ name: 'role', enum: RoleSortEnum })
  @ApiQuery({ name: 'status', enum: StatusSortEnum })
  @ApiQuery({ name: 'field', enum: UserSortEnum })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiListResponse(UserDTO)
  async findAllUserPagination(
    @Query() payable: FilterPaginationBase,
    @Query()
    query: { role: string; field: string; status: string; search: string },
  ): Promise<IPaginateResponse<UserDTO> | { message: string }> {
    const [result, count] = await this.userService.findAllUserPagination(
      payable,
      query.role,
      query.status,
      query.field,
      // sort,
      query.search,
    );
    if (count == 0) {
      return { message: 'No Data User' };
    }
    return paginateResponse<UserDTO>(
      [result, count],
      payable.currentPage as number,
      payable.sizePage as number,
    );
  }
}
