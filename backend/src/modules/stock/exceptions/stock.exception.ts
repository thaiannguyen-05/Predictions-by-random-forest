import { HttpException, HttpStatus } from '@nestjs/common';

export class StockException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

export class MLServiceConnectionException extends StockException {
  constructor(ticker?: string) {
    const message = ticker
      ? `Cannot connect to ML Service for ticker ${ticker}`
      : 'Cannot connect to ML Service';
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class MLServiceErrorException extends StockException {
  constructor(operation: string, errorMessage: string) {
    super(
      `ML Service error during ${operation}: ${errorMessage}`,
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export class PriceDataNotFoundException extends StockException {
  constructor(ticker: string) {
    super(`Price data not found for ticker ${ticker}`, HttpStatus.NOT_FOUND);
  }
}

export class FinancialDataNotFoundException extends StockException {
  constructor(ticker: string) {
    super(
      `Financial data not found for ticker ${ticker}`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class ModelTrainingException extends StockException {
  constructor(ticker: string, reason?: string) {
    const message = reason
      ? `Failed to train model for ${ticker}: ${reason}`
      : `Failed to train model for ${ticker}`;
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class PredictionException extends StockException {
  constructor(ticker: string, reason?: string) {
    const message = reason
      ? `Failed to get prediction for ${ticker}: ${reason}`
      : `Failed to get prediction for ${ticker}`;
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class InvalidTickerException extends StockException {
  constructor(ticker: string) {
    super(`Invalid ticker: ${ticker}`, HttpStatus.BAD_REQUEST);
  }
}

export class MLServiceTimeoutException extends StockException {
  constructor(command: string) {
    super(
      `ML Service request timeout for command: ${command}`,
      HttpStatus.GATEWAY_TIMEOUT,
    );
  }
}
