import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Base exception cho Stock module.
 */
export class StockException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

/**
 * Exception khi không thể kết nối ML Service.
 */
export class MLServiceConnectionException extends StockException {
  constructor(ticker?: string) {
    const message = ticker
      ? `Cannot connect to ML Service for ticker ${ticker}`
      : 'Cannot connect to ML Service';
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

/**
 * Exception khi ML Service trả về lỗi.
 */
export class MLServiceErrorException extends StockException {
  constructor(operation: string, errorMessage: string) {
    super(
      `ML Service error during ${operation}: ${errorMessage}`,
      HttpStatus.BAD_GATEWAY,
    );
  }
}

/**
 * Exception khi không tìm thấy dữ liệu giá.
 */
export class PriceDataNotFoundException extends StockException {
  constructor(ticker: string) {
    super(`Price data not found for ticker ${ticker}`, HttpStatus.NOT_FOUND);
  }
}

/**
 * Exception khi không tìm thấy dữ liệu tài chính.
 */
export class FinancialDataNotFoundException extends StockException {
  constructor(ticker: string) {
    super(
      `Financial data not found for ticker ${ticker}`,
      HttpStatus.NOT_FOUND,
    );
  }
}

/**
 * Exception khi train model thất bại.
 */
export class ModelTrainingException extends StockException {
  constructor(ticker: string, reason?: string) {
    const message = reason
      ? `Failed to train model for ${ticker}: ${reason}`
      : `Failed to train model for ${ticker}`;
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Exception khi prediction thất bại.
 */
export class PredictionException extends StockException {
  constructor(ticker: string, reason?: string) {
    const message = reason
      ? `Failed to get prediction for ${ticker}: ${reason}`
      : `Failed to get prediction for ${ticker}`;
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

/**
 * Exception khi ticker không hợp lệ.
 */
export class InvalidTickerException extends StockException {
  constructor(ticker: string) {
    super(`Invalid ticker: ${ticker}`, HttpStatus.BAD_REQUEST);
  }
}

/**
 * Exception khi request timeout.
 */
export class MLServiceTimeoutException extends StockException {
  constructor(command: string) {
    super(
      `ML Service request timeout for command: ${command}`,
      HttpStatus.GATEWAY_TIMEOUT,
    );
  }
}
