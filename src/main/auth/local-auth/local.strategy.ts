import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Payload } from '../jwt/payload';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<Payload> {
    const user = await this.authService.validateUser(
      username,
      password,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      req.body.role,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
