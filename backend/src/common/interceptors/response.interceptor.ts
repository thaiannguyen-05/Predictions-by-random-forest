import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StandardResponse } from '../interfaces';
import type { LegacyResponse } from './types';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        if (this.isStandardResponse(response)) {
          return response as StandardResponse<T>;
        }

        if (this.isLegacyResponse(response)) {
          return this.transformLegacyResponse(response);
        }

        return this.wrapData(response as T);
      }),
    );
  }

  private isStandardResponse(response: unknown): boolean {
    if (typeof response !== 'object' || response === null) {
      return false;
    }
    const obj = response as Record<string, unknown>;
    return (
      typeof obj['success'] === 'boolean' &&
      'data' in obj &&
      typeof obj['timestamp'] === 'string'
    );
  }

  private isLegacyResponse(response: unknown): response is LegacyResponse {
    if (typeof response !== 'object' || response === null) {
      return false;
    }
    const obj = response as Record<string, unknown>;
    return typeof obj['status'] === 'boolean';
  }

  private transformLegacyResponse(
    response: LegacyResponse,
  ): StandardResponse<T> {
    return {
      success: response.status,
      data: (response.data ?? null) as T,
      message: response.message ?? (response.status ? 'Success' : 'Failed'),
      timestamp: new Date().toISOString(),
    };
  }

  private wrapData(data: T): StandardResponse<T> {
    return {
      success: true,
      data,
      message: 'Success',
      timestamp: new Date().toISOString(),
    };
  }
}
