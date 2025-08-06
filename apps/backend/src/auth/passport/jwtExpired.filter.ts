import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Response } from 'express';

@Catch(TokenExpiredError)
export class JwtExpiredFilter implements ExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 406;

    response.status(status).json({
      statusCode: status,
      message: 'JWT token has expired!',
    });
  }
}
