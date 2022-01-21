import { DeleteResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/public';
import User from './user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async createUser(@Body() createUser: UserDto): Promise<User> {
    return await this.userService.createData(createUser);
  }

  @Get()
  @Public()
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Put('/:id')
  @Public()
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUser);
  }

  @Delete('/:id')
  @Public()
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteById(id);
  }
}
