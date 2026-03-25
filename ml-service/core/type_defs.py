"""
Type definitions cho ML Service.
Sử dụng TypedDict và dataclasses để định nghĩa cấu trúc dữ liệu.
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Optional, TypedDict, Any
import pandas as pd


# ========================
# TypedDict Definitions
# ========================

class PriceInfo(TypedDict):
    """Thông tin giá hiện tại."""
    price: float
    time: datetime
    symbol: str


class FinancialData(TypedDict):
    """Dữ liệu tài chính của cổ phiếu."""
    ticker: str
    previous_close: Optional[float]
    open: Optional[float]
    high: Optional[float]
    low: Optional[float]
    volume: Optional[int]
    market_cap: Optional[int]
    pe_ratio: Optional[float]
    eps: Optional[float]
    beta: Optional[float]
    yahoo_price: Optional[float]


class PredictionResult(TypedDict):
    """Kết quả dự đoán."""
    current_price: Optional[float]
    current_time: datetime
    prediction_time: datetime
    prediction: str  # "TĂNG" hoặc "GIẢM"
    probability: float
    confidence: float
    predicted_price: Optional[float]
    hours_ahead: int
    symbol: str


class MultiHourPrediction(TypedDict):
    """Kết quả dự đoán cho một khung giờ."""
    hour: int
    hours_ahead: int
    predicted_price: Optional[float]
    prediction: str
    probability: float
    confidence: float
    prediction_time: str  # ISO format


class TCPResponse(TypedDict):
    """Response format cho TCP server."""
    success: bool
    error: Optional[str]
    data: Optional[Dict[str, Any]]
    timestamp: str


# ========================
# Dataclass Definitions
# ========================

@dataclass
class ModelData:
    """Dữ liệu model đã train."""
    model: Any  # RandomForestClassifier
    selected_predictors: List[str]
    ticker: str


@dataclass
class BacktestResult:
    """Kết quả backtest."""
    predictions: pd.DataFrame
    accuracy: float
    precision: float
    recall: float


@dataclass
class TrainingResult:
    """Kết quả training."""
    success: bool
    ticker: str
    features_count: int
    model_path: str
    feature_importances: Optional[pd.Series] = None
    error: Optional[str] = None
