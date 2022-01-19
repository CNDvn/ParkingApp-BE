import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Payload } from 'src/main/auth/jwt/payload';

type BodyUser = Request & { user: Payload };
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Payload => {
    const reqBody: BodyUser = ctx.switchToHttp().getRequest<BodyUser>();
    return reqBody.user;
  },
);
