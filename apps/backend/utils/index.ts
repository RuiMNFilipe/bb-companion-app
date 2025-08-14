import { Coach } from '@bb-companion/database';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: Coach;
}

export const CurrentUser = createParamDecorator(
  (data: keyof Coach | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!request.user) {
      throw new UnauthorizedException('Authentication required.');
    }

    const user: Coach = request.user;

    if (data) {
      return user[data];
    }

    const { passwordHash: _password, ...safeUser } = user;
    return safeUser;
  },
);
