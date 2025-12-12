"""
ML Service - Stock Prediction using Random Forest.

Modules:
- config: Configuration và constants
- data_loader: Load và update dữ liệu từ yfinance
- features: Feature engineering
- model: Model training và prediction
- real_time_prediction: Real-time prediction service
- tcp_server: TCP server để phục vụ predictions
- exceptions: Custom exception classes
- type_defs: Type definitions
"""
from config import TICKERS, standardize_ticker, get_csv_path, get_model_path
from data_loader import load_data, update_all_data
from features import add_features
from model import create_model, predict, backtest, select_features
from real_time_prediction import RealTimePrediction

__version__ = "1.0.0"
__author__ = "ML Service Team"

__all__ = [
    # Config
    "TICKERS",
    "standardize_ticker",
    "get_csv_path",
    "get_model_path",
    # Data
    "load_data",
    "update_all_data",
    # Features
    "add_features",
    # Model
    "create_model",
    "predict",
    "backtest",
    "select_features",
    # Real-time
    "RealTimePrediction",
]
