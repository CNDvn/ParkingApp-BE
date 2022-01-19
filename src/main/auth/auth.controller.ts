import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { GetUser } from 'src/decorator/getUser.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { Payload } from './jwt/payload';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  async login(@GetUser() user: Payload, @Req() req: Request): Promise<string> {
    const data = await this.authService.login(user);
    req.res
      .cookie('access_token', data.access_token, {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        httpOnly: false,
        secure: true,
      })
      .cookie('refresh_token', data.refresh_token, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        path: '/api/v1/auth/refreshToken',
        sameSite: 'none',
        httpOnly: false,
        secure: true,
      });
    return data.message;
  }
}
