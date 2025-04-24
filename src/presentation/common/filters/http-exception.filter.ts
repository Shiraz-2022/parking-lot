import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global exception filter that handles all HTTP exceptions
 * Formats error responses in a consistent way
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Catches and formats HTTP exceptions
   * Returns a standardized error response
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      error: exception instanceof HttpException ? exception.name : 'Error',
    };

    response.status(status).json(errorResponse);
  }
} 