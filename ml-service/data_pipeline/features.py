"""
Feature engineering module cho ML Service.
Tạo các features cho mô hình dự đoán giá cổ phiếu.
"""
import logging
from typing import List, Tuple

import pandas as pd

from core.config import ROLLING_HORIZONS, LAG_PERIODS, RETURN_WINDOWS

# Configure logging
logger = logging.getLogger(__name__)


def add_features(
    df: pd.DataFrame, 
    horizon: int = 5
) -> Tuple[pd.DataFrame, List[str]]:
    """
    Sinh thêm các features cho mô hình dự đoán.
    
    Args:
        df: DataFrame chứa dữ liệu OHLCV
        horizon: Số ngày để dự đoán (T+1, T+2, ..., T+n)
        
    Returns:
        Tuple[DataFrame với features mới, List các tên predictors]
    """
    df = df.copy()
    predictors: List[str] = []
    
    # Tạo biến Target (nhãn dự đoán)
    df["Tomorrow"] = df["Close"].shift(-horizon)
    df["Target"] = (df["Tomorrow"] > df["Close"]).astype(int)
    
    # Rolling ratios & xu hướng (trend)
    # Lưu ý: Trend phải chỉ dùng dữ liệu quá khứ (không dùng Target vì Target phụ thuộc giá tương lai).
    historical_up = (df["Close"].diff() > 0).astype(int)

    for rolling_horizon in ROLLING_HORIZONS:
        rolling_averages = df.rolling(rolling_horizon).mean()

        # Close ratio: tỷ lệ giá hiện tại so với trung bình
        ratio_col = f"Close_Ratio_{rolling_horizon}"
        df[ratio_col] = df["Close"] / rolling_averages["Close"]
        predictors.append(ratio_col)

        # Trend: tổng số phiên tăng trong rolling window trước đó
        trend_col = f"Trend_{rolling_horizon}"
        df[trend_col] = historical_up.shift(1).rolling(rolling_horizon).sum()
        predictors.append(trend_col)
    
    # Lag features (dùng giá quá khứ để dự đoán hiện tại)
    for lag in LAG_PERIODS:
        lag_col = f"Lag_{lag}"
        df[lag_col] = df["Close"].shift(lag)
        predictors.append(lag_col)
    
    # Daily return (lợi suất hàng ngày)
    df["Return"] = df["Close"].pct_change()
    predictors.append("Return")

    # MA20 + MDA20 (Moving Average Distance)
    df["MA20"] = df["Close"].rolling(20).mean()
    predictors.append("MA20")

    df["MDA_20"] = (df["Close"] - df["MA20"]) / df["MA20"]
    predictors.append("MDA_20")

    # RSI 14 (Wilder)
    delta = df["Close"].diff()
    gain = delta.clip(lower=0)
    loss = (-delta).clip(lower=0)
    avg_gain = gain.ewm(alpha=1 / 14, adjust=False).mean()
    avg_loss = loss.ewm(alpha=1 / 14, adjust=False).mean()
    rs = avg_gain / avg_loss
    df["RSI_14"] = 100 - (100 / (1 + rs))
    predictors.append("RSI_14")

    # Rolling mean/median return (xu hướng lợi suất ngắn hạn)
    for window in RETURN_WINDOWS:
        mean_col = f"RollingMeanRet_{window}"
        median_col = f"RollingMedianRet_{window}"

        df[mean_col] = df["Return"].rolling(window).mean()
        df[median_col] = df["Return"].rolling(window).median()

        predictors.append(mean_col)
        predictors.append(median_col)
    
    # Volatility features
    for window in RETURN_WINDOWS:
        vol_col = f"Volatility_{window}"
        df[vol_col] = df["Return"].rolling(window).std()
        predictors.append(vol_col)
    
    # Volume features
    if "Volume" in df.columns:
        for window in RETURN_WINDOWS:
            vol_ratio_col = f"Volume_Ratio_{window}"
            df[vol_ratio_col] = df["Volume"] / df["Volume"].rolling(window).mean()
            predictors.append(vol_ratio_col)
    
    # Drop rows với NaN values
    initial_rows = len(df)
    df = df.dropna()
    dropped_rows = initial_rows - len(df)
    
    if dropped_rows > 0:
        logger.debug(f"Dropped {dropped_rows} rows with NaN values")
    
    logger.debug(f"Created {len(predictors)} features")
    
    return df, predictors


def get_feature_description() -> dict:
    """
    Trả về mô tả các features được tạo.
    
    Returns:
        Dictionary với key là tên feature, value là mô tả
    """
    descriptions = {
        "Close_Ratio_X": "Tỷ lệ giá đóng cửa so với trung bình X ngày",
        "Trend_X": "Số ngày giá tăng trong X ngày gần nhất",
        "Lag_X": "Giá đóng cửa X ngày trước",
        "Return": "Lợi suất ngày hôm nay",
        "MA20": "Đường trung bình động 20 ngày của giá đóng cửa",
        "MDA_20": "Khoảng cách giữa Close và MA20 theo tỷ lệ (Close - MA20) / MA20",
        "RSI_14": "Relative Strength Index 14 phiên theo công thức Wilder",
        "RollingMeanRet_X": "Lợi suất trung bình X ngày",
        "RollingMedianRet_X": "Lợi suất trung vị X ngày",
        "Volatility_X": "Độ biến động X ngày (std của return)",
        "Volume_Ratio_X": "Tỷ lệ khối lượng so với trung bình X ngày",
    }
    return descriptions
