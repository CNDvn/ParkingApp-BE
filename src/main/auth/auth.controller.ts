import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { GetUser } from 'src/decorator/getUser.decorator';
import User from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/loginAuthDto';
import { LoginDto } from './dto/loginDto';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { Public } from './public';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@GetUser() user: User): Promise<LoginAuthDto> {
    return await this.authService.login(user);
  }
}
