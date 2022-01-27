import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role/role.enum';
import { LoginAuthDto } from './dto/loginAuthDto';
import { Payload } from './jwt/payload';
import { jwtConstants } from './constants';
import User from '../user/user.entity';
import { Status } from 'src/utils/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === password && user.status === Status.ACTIVE) {
      user.password = undefined;
      if (user.role.name === role) {
        return user;
      }
    }
    throw new HttpException(
      'Username or password invalid',
      HttpStatus.BAD_REQUEST,
    );
  }

  login(user: User): LoginAuthDto {
    const payload: Payload = {
      id: user.id,
      username: user.username,
      roles: [user.role.name],
    };
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
