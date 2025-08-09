import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Catch(TokenExpiredError)
export class JwtExpiredFilter implements ExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = HttpStatus.UNAUTHORIZED;

    response.status(status).json({
      statusCode: status,
      error: 'Unauthorized',
      message: 'JWT token has expired',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest<Request>().url,
    });
  }
}
