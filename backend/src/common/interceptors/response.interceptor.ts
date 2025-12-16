import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StandardResponse } from '../interfaces/response.interface';

/**
 * Response wrapper types
 * Cho phép service trả về các format khác nhau
 */
interface LegacyResponse {
	status: boolean;
	data?: unknown;
	message?: string;
}

/**
 * Global Response Interceptor
 * Chuẩn hóa tất cả response về format StandardResponse
 *
 * Input có thể là:
 * - Legacy format: { status: true, data: {...} }
 * - Direct data: { post: {...} }
 * - Plain value: "message" hoặc { user: {...} }
 *
 * Output luôn là:
 * {
 *   success: boolean,
 *   data: T,
 *   message: string,
 *   timestamp: string
 * }
 */
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
				// Nếu response đã có format chuẩn (success field), trả về luôn
				if (this.isStandardResponse(response)) {
					return response as StandardResponse<T>;
				}

				// Chuyển đổi legacy format { status: true, data: {...} }
				if (this.isLegacyResponse(response)) {
					return this.transformLegacyResponse(response);
				}

				// Response là data trực tiếp
				return this.wrapData(response as T);
			}),
		);
	}

	/**
	 * Kiểm tra xem response đã có format chuẩn chưa
	 */
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

	/**
	 * Kiểm tra legacy response format
	 */
	private isLegacyResponse(response: unknown): response is LegacyResponse {
		if (typeof response !== 'object' || response === null) {
			return false;
		}
		const obj = response as Record<string, unknown>;
		return typeof obj['status'] === 'boolean';
	}

	/**
	 * Chuyển đổi legacy format sang standard format
	 */
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

	/**
	 * Wrap data trực tiếp vào standard format
	 */
	private wrapData(data: T): StandardResponse<T> {
		return {
			success: true,
			data,
			message: 'Success',
			timestamp: new Date().toISOString(),
		};
	}
}
