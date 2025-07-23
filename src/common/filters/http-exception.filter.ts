import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';
    let code: string = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        code = exceptionResponse.toUpperCase().replace(/\s/g, '_');
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as {
          message?: string | string[] | object;
          error?: string;
        };
        if (
          res.message &&
          Array.isArray(res.message) &&
          res.message.every((item) => typeof item === 'string')
        ) {
          message = res.message.join(', ');
          code = 'VALIDATION_FAILED';
        } else if (
          res.message &&
          (typeof res.message === 'string' ||
            (typeof res.message === 'object' && res.message !== null))
        ) {
          message = res.message;
          code =
            res.error ||
            (typeof res.message === 'string'
              ? res.message.toUpperCase().replace(/\s/g, '_')
              : 'HTTP_EXCEPTION_OBJECT_MESSAGE');
        } else if (res.error) {
          message = res.error;
          code = res.error.toUpperCase().replace(/\s/g, '_');
        } else {
          message = exceptionResponse;
          code = 'HTTP_EXCEPTION';
        }
      }

      this.logger.warn(
        `HTTP Exception (${status}) on ${request.method} ${request.url}: ${JSON.stringify(message)}`,
      );
    } else {
      this.logger.error(
        `Unhandled Exception on ${request.method} ${request.url}:`,
        exception,
      );
      if (process.env.NODE_ENV === 'production') {
        message = 'An unexpected error occurred';
      } else {
        message = (exception as Error).message || message;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
