"""
Feature engineering module cho ML Service.
Tạo các features cho mô hình dự đoán giá cổ phiếu.
"""
import logging
from typing import List, Tuple

import pandas as pd

from core.config import ROLLING_HORIZONS, LAG_PERIODS, RETURN_WINDOWS

# Minimum price change percentage to consider as meaningful signal
MIN_CHANGE_PCT: float = 0.0  # Giữ toàn bộ data

# Default horizon: next-day prediction
DEFAULT_HORIZON: int = 1

# Configure logging
logger = logging.getLogger(__name__)


def add_features(
    df: pd.DataFrame,
    horizon: int = 1
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

    # Tạo biến Target với threshold (chỉ count nếu change >= 1%)
    df["Tomorrow"] = df["Close"].shift(-horizon)
    pct_change = (df["Tomorrow"] - df["Close"]) / df["Close"]
    df["Target"] = (pct_change > MIN_CHANGE_PCT).astype(int)
    df["TargetPrice"] = df["Tomorrow"]

    # Lọc bỏ các ngày có |change| < MIN_CHANGE_PCT (không phải signal rõ ràng)
    valid_mask = abs(pct_change) >= MIN_CHANGE_PCT

    # Rolling ratios & xu hướng (trend)
    historical_up = (df["Close"].diff() > 0).astype(int)

    for rolling_horizon in ROLLING_HORIZONS:
        rolling_averages = df.rolling(rolling_horizon).mean()

        ratio_col = f"Close_Ratio_{rolling_horizon}"
        df[ratio_col] = df["Close"] / rolling_averages["Close"]
        predictors.append(ratio_col)

        trend_col = f"Trend_{rolling_horizon}"
        df[trend_col] = historical_up.shift(1).rolling(rolling_horizon).sum()
        predictors.append(trend_col)

    # Lag features
    for lag in LAG_PERIODS:
        lag_col = f"Lag_{lag}"
        df[lag_col] = df["Close"].shift(lag)
        predictors.append(lag_col)

    # Daily return
    df["Return"] = df["Close"].pct_change()
    predictors.append("Return")

    # MA20 + MDA20
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

    # RSI zones (overbought/oversold signals)
    df["RSI_Overbought"] = (df["RSI_14"] > 70).astype(int)
    df["RSI_Oversold"] = (df["RSI_14"] < 30).astype(int)
    predictors.extend(["RSI_Overbought", "RSI_Oversold"])

    # Rolling mean/median return
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

    # OHLC-based features (price action)
    if "High" in df.columns and "Low" in df.columns:
        df["DailyRange"] = (df["High"] - df["Low"]) / df["Close"]
        predictors.append("DailyRange")

        df["UpperShadow"] = (df["High"] - df[["Open", "Close"]].max(axis=1)) / df["Close"]
        df["LowerShadow"] = (df[["Open", "Close"]].min(axis=1) - df["Low"]) / df["Close"]
        predictors.append("UpperShadow")
        predictors.append("LowerShadow")

        df["BodyRatio"] = (df["Close"] - df["Open"]) / df["Close"]
        predictors.append("BodyRatio")

    # Open-Close gap
    if "Open" in df.columns:
        df["Gap"] = (df["Open"] - df["Close"].shift(1)) / df["Close"].shift(1)
        predictors.append("Gap")

    # MACD (12, 26, 9)
    ema12 = df["Close"].ewm(span=12, adjust=False).mean()
    ema26 = df["Close"].ewm(span=26, adjust=False).mean()
    df["MACD"] = ema12 - ema26
    df["MACD_Signal"] = df["MACD"].ewm(span=9, adjust=False).mean()
    df["MACD_Hist"] = df["MACD"] - df["MACD_Signal"]
    predictors.extend(["MACD", "MACD_Signal", "MACD_Hist"])

    # MACD crossover (1 = MACD crossed above signal, -1 = crossed below, 0 = no cross)
    macd_prev = df["MACD"].shift(1)
    signal_prev = df["MACD_Signal"].shift(1)
    df["MACD_Crossover"] = (
        ((df["MACD"] > df["MACD_Signal"]) & (macd_prev <= signal_prev)).astype(int)
        - ((df["MACD"] < df["MACD_Signal"]) & (macd_prev >= signal_prev)).astype(int)
    )
    predictors.append("MACD_Crossover")

    # EMA crossover
    ema5 = df["Close"].ewm(span=5, adjust=False).mean()
    ema10 = df["Close"].ewm(span=10, adjust=False).mean()
    df["EMA5_10_Ratio"] = (ema5 - ema10) / ema10
    predictors.append("EMA5_10_Ratio")

    # EMA 10/30 crossover (medium-term momentum)
    ema30 = df["Close"].ewm(span=30, adjust=False).mean()
    df["EMA10_30_Ratio"] = (ema10 - ema30) / ema30
    predictors.append("EMA10_30_Ratio")

    # Price momentum: multi-period returns
    for window in [5, 10, 20, 60]:
        mom_col = f"Momentum_{window}"
        df[mom_col] = df["Close"].pct_change(window)
        predictors.append(mom_col)

    # Volatility regime: ratio of short-term (20d) to long-term (60d) volatility
    vol_20 = df["Return"].rolling(20).std()
    vol_60 = df["Return"].rolling(60).std()
    df["Vol_Regime"] = vol_20 / vol_60
    predictors.append("Vol_Regime")

    # Distance from 52-week high/low (252 trading days)
    high_52w = df["High"].rolling(252).max()
    low_52w = df["Low"].rolling(252).min()
    df["Dist_52W_High"] = (df["Close"] - high_52w) / high_52w
    df["Dist_52W_Low"] = (df["Close"] - low_52w) / low_52w
    predictors.extend(["Dist_52W_High", "Dist_52W_Low"])

    # Volume features
    if "Volume" in df.columns:
        for window in RETURN_WINDOWS:
            vol_ratio_col = f"Volume_Ratio_{window}"
            df[vol_ratio_col] = df["Volume"] / df["Volume"].rolling(window).mean()
            predictors.append(vol_ratio_col)

        # Volume-price trend correlation
        df["Vol_Price_Corr"] = df["Volume"].rolling(20).corr(df["Close"].pct_change())
        predictors.append("Vol_Price_Corr")

        # Volume surge (volume > 2x average)
        df["Volume_Surge"] = (df["Volume"] > 2 * df["Volume"].rolling(20).mean()).astype(int)
        predictors.append("Volume_Surge")

    # Interaction features
    # RSI x Volume (momentum confirmed by volume)
    df["RSI_Volume"] = df["RSI_14"] * df.get("Volume_Ratio_20", df["RSI_14"])
    predictors.append("RSI_Volume")

    # MACD_Hist x Trend (momentum direction alignment)
    df["MACD_Trend"] = df["MACD_Hist"] * df.get("Trend_20", df["MACD_Hist"])
    predictors.append("MACD_Trend")

    # Volatility x Momentum (risk-adjusted momentum)
    vol_20 = df["Return"].rolling(20).std()
    if "Momentum_20" in df.columns:
        df["VolAdj_Momentum"] = df["Momentum_20"] / vol_20
        predictors.append("VolAdj_Momentum")

    # Drop rows với NaN values
    initial_rows = len(df)
    df = df.dropna()
    dropped_rows = initial_rows - len(df)

    if dropped_rows > 0:
        logger.debug(f"Dropped {dropped_rows} rows with NaN values")

    logger.debug(f"Created {len(predictors)} features, {len(df)} rows")

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
        "RSI_Overbought": "RSI > 70 (quá mua)",
        "RSI_Oversold": "RSI < 30 (quá bán)",
        "RollingMeanRet_X": "Lợi suất trung bình X ngày",
        "RollingMedianRet_X": "Lợi suất trung vị X ngày",
        "Volatility_X": "Độ biến động X ngày (std của return)",
        "Volume_Ratio_X": "Tỷ lệ khối lượng so với trung bình X ngày",
        "DailyRange": "Biên độ giao dịch trong ngày (High-Low)/Close",
        "UpperShadow": "Bóng nến trên (High - max(Open,Close))/Close",
        "LowerShadow": "Bóng nến dưới (min(Open,Close) - Low)/Close",
        "BodyRatio": "Thân nến (Close-Open)/Close",
        "Gap": "Khoảng cách giá mở cửa so với đóng cửa hôm trước",
        "MACD": "MACD (EMA12 - EMA26)",
        "MACD_Signal": "Đường signal MACD (EMA9 của MACD)",
        "MACD_Hist": "MACD Histogram (MACD - Signal)",
        "MACD_Crossover": "MACD vượt signal (+1) hay signal vượt MACD (-1)",
        "EMA5_10_Ratio": "Tỷ lệ EMA5/EMA10 - tín hiệu crossover ngắn hạn",
        "EMA10_30_Ratio": "Tỷ lệ EMA10/EMA30 - động lượng trung hạn",
        "Momentum_X": "Lợi suất X ngày (price momentum)",
        "Vol_Regime": "Tỷ lệ biến động 20 ngày / 60 ngày (chế độ biến động)",
        "Dist_52W_High": "Khoảng cách từ giá tới đỉnh 52 tuần",
        "Dist_52W_Low": "Khoảng cách từ giá tới đáy 52 tuần",
        "Volume_Surge": "Volume > 2x trung bình 20 ngày",
        "Vol_Price_Corr": "Tương quan volume và biến động giá 20 ngày",
        "RSI_Volume": "RSI × Volume_Ratio_20 (động lượng xác nhận bởi volume)",
        "MACD_Trend": "MACD_Hist × Trend_20 (định hướng momentum)",
        "VolAdj_Momentum": "Momentum_20 / Volatility_20 (risk-adjusted momentum)",
    }
    return descriptions
