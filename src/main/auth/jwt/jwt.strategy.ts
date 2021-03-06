/* eslint-disable no-console */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Payload } from './payload';
import { UserService } from 'src/main/user/user.service';
import User from 'src/main/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: jwtConstants.accessTokenSecret,
    });
  }

  async validate(payload: Payload): Promise<User> {
    const user = await this.userService.findByUsername(payload.username);
    if (user.refreshToken === null) return null;
    return user;
  }
}
