import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Standard response format for API responses
 */
export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
  timestamp: string;
}

/**
 * Interceptor that transforms all responses into a standard format
 * Adds status code, message and timestamp to the response
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * Transforms the response into a standard format
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: 'Success',
        timestamp: new Date().toISOString(),
      })),
    );
  }
} 