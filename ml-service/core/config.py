"""
Constants và configuration cho ML Service.
Tập trung tất cả magic numbers và configuration vào đây.
"""
from typing import List

# ========================
# Model Configuration
# ========================
MODEL_CONFIG = {
    "n_estimators": 300,
    "min_samples_split": 30,
    "min_samples_leaf": 15,
    "max_depth": 10,
    "class_weight": "balanced_subsample",
    "bootstrap": True,
    "max_samples": None,
    "n_jobs": -1,
    "random_state": 1,
}

# Feature selection threshold
FEATURE_THRESHOLD: float = 0.005

# Threshold optimization metric for turning probability into TĂNG/GIẢM.
# Balanced accuracy keeps TĂNG/GIẢM errors closer instead of over-favoring one side.
THRESHOLD_OPTIMIZATION_METRIC: str = "balanced_accuracy"

# RandomForest threshold tuning range (finer granularity)
RF_THRESHOLD_GRID: List[float] = [
    0.35, 0.38, 0.40, 0.42, 0.45, 0.48,
    0.50, 0.52, 0.55, 0.58, 0.60, 0.63, 0.65,
]

# RandomForest comprehensive tuning grid
RF_TUNING_GRID = {
    "n_estimators": [200, 300],
    "min_samples_split": [20, 30, 50],
    "max_depth": [5, 8, 10, 12, 15, None],
    "min_samples_leaf": [5, 10, 15, 20],
    "max_features": ["sqrt", "log2", 0.3, 0.5],
}

# Walk-forward evaluation configuration
EVAL_MIN_FOLDS: int = 3
EVAL_MAX_FOLDS: int = 8
EVAL_MIN_TEST_SIZE: int = 5
EVAL_MAX_TEST_SIZE: int = 20

# Backtest configuration
BACKTEST_START: int = 250
BACKTEST_STEP: int = 20

# ========================
# Data Configuration
# ========================
DATA_DIR: str = "data"
MODELS_DIR: str = "models"

# Data start date. Recent data keeps training practical and focuses on newer market regimes.
DATA_START_DATE: str = "2020-01-01"

# Rolling horizons for features
ROLLING_HORIZONS: List[int] = [2, 5, 30, 90, 250]

# Lag features
LAG_PERIODS: List[int] = [1, 2, 3, 5, 10]

# Rolling windows for return features
RETURN_WINDOWS: List[int] = [5, 20]

# ========================
# Prediction Configuration
# ========================
TRADING_HOURS_PER_DAY: int = 8
DEFAULT_PROBABILITY_THRESHOLD: float = 0.5
DEFAULT_HOURS_AHEAD: int = 24
PREDICTION_INTERVALS: List[int] = [1, 2, 3, 24]
MULTI_HOUR_PREDICTIONS: List[int] = [1, 2, 3]

# For price prediction fallback
DEFAULT_HOURLY_PRICE_CHANGE: float = 0.02  # 2% per hour

# ========================
# Server Configuration
# ========================
SERVER_HOST: str = "0.0.0.0"
SERVER_PORT: int = 9999
SOCKET_BUFFER_SIZE: int = 4096
MAX_CONNECTIONS: int = 5

# ========================
# Ticker Configuration
# ========================
TICKER_SUFFIX: str = ".VN"

# Danh sách 40 mã cổ phiếu VN30 và các mã phổ biến
TICKERS: List[str] = [
    "FPT.VN", "VNM.VN", "VCB.VN", "VHM.VN", "VIC.VN",
    "HPG.VN", "TCB.VN", "VPB.VN", "MSN.VN", "MWG.VN",
    "GAS.VN", "PLX.VN", "SAB.VN", "BID.VN", "CTG.VN",
    "POW.VN", "VRE.VN", "SSI.VN", "HDB.VN", "MBB.VN",
    "STB.VN", "VJC.VN", "GVR.VN", "PDR.VN", "VCG.VN",
    "ACB.VN", "TPB.VN", "KDH.VN", "NVL.VN", "VCI.VN",
    "BCM.VN", "DPM.VN", "DGC.VN", "BAF.VN", "PNJ.VN",
    "REE.VN", "SBT.VN", "VGC.VN", "VHC.VN", "BVH.VN",
]


def standardize_ticker(ticker: str) -> str:
    """
    Chuẩn hóa mã cổ phiếu về định dạng chuẩn (VD: FPT -> FPT.VN).
    
    Args:
        ticker: Mã cổ phiếu cần chuẩn hóa
        
    Returns:
        Mã cổ phiếu đã được chuẩn hóa
    """
    upper_ticker = ticker.upper()
    if not upper_ticker.endswith(TICKER_SUFFIX):
        return f"{upper_ticker}{TICKER_SUFFIX}"
    return upper_ticker


def get_csv_path(ticker: str) -> str:
    """
    Lấy đường dẫn file CSV cho một ticker.
    
    Args:
        ticker: Mã cổ phiếu
        
    Returns:
        Đường dẫn file CSV
    """
    standardized = standardize_ticker(ticker)
    return f"{DATA_DIR}/{standardized.replace('.', '_')}_stock_data.csv"


def get_model_path(ticker: str) -> str:
    """
    Lấy đường dẫn file model cho một ticker.
    
    Args:
        ticker: Mã cổ phiếu
        
    Returns:
        Đường dẫn file model
    """
    standardized = standardize_ticker(ticker)
    return f"{MODELS_DIR}/{standardized.replace('.', '_')}_model.pkl"
