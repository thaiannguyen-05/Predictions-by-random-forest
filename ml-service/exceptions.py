"""
Custom exceptions cho ML Service.
Định nghĩa các exception classes cụ thể thay vì dùng Exception chung.
"""


class MLServiceException(Exception):
    """Base exception cho ML Service."""
    
    def __init__(self, message: str, ticker: str = None):
        self.message = message
        self.ticker = ticker
        super().__init__(self.message)


class DataLoadException(MLServiceException):
    """Exception khi không thể load dữ liệu."""
    
    def __init__(self, ticker: str, reason: str = None):
        message = f"Cannot load data for {ticker}"
        if reason:
            message += f": {reason}"
        super().__init__(message, ticker)


class ModelNotTrainedException(MLServiceException):
    """Exception khi model chưa được train."""
    
    def __init__(self, ticker: str):
        message = f"Model for {ticker} is not trained"
        super().__init__(message, ticker)


class ModelTrainingException(MLServiceException):
    """Exception khi training model thất bại."""
    
    def __init__(self, ticker: str, reason: str = None):
        message = f"Failed to train model for {ticker}"
        if reason:
            message += f": {reason}"
        super().__init__(message, ticker)


class PredictionException(MLServiceException):
    """Exception khi dự đoán thất bại."""
    
    def __init__(self, ticker: str, reason: str = None):
        message = f"Failed to make prediction for {ticker}"
        if reason:
            message += f": {reason}"
        super().__init__(message, ticker)


class PriceDataException(MLServiceException):
    """Exception khi không thể lấy dữ liệu giá."""
    
    def __init__(self, ticker: str, reason: str = None):
        message = f"Cannot get price data for {ticker}"
        if reason:
            message += f": {reason}"
        super().__init__(message, ticker)


class InvalidTickerException(MLServiceException):
    """Exception khi ticker không hợp lệ."""
    
    def __init__(self, ticker: str):
        message = f"Invalid ticker: {ticker}"
        super().__init__(message, ticker)


class InsufficientDataException(MLServiceException):
    """Exception khi không đủ dữ liệu để backtest/train."""
    
    def __init__(self, ticker: str, required: int, available: int):
        message = f"Insufficient data for {ticker}: need {required}, got {available}"
        self.required = required
        self.available = available
        super().__init__(message, ticker)
