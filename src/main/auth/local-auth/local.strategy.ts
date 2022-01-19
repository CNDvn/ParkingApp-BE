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
    const { role } = req.body as { role: string };
    const user = await this.authService.validateUser(username, password, role);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
