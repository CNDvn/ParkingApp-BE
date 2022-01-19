import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role/role.enum';
import { LoginAuthDto } from './dto/loginAuthDto';
import { Payload } from './jwt/payload';
import { jwtConstants } from './constants';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<Payload | undefined> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      user.password = undefined;
      if (role === Role.Admin) {
      }
      if (role === Role.Business) {
      }
      if (role === Role.Customer) {
      }
    }
    return null;
  }

  login(payload: Payload): LoginAuthDto {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '3d',
      }),
      refresh_token: this.jwtService.sign(
        { id: payload.id },
        {
          secret: jwtConstants.refreshTokenSecret,
          expiresIn: '365d',
        },
      ),
      message: 'Success',
    };
  }
}
