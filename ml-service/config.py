"""
Constants và configuration cho ML Service.
Tập trung tất cả magic numbers và configuration vào đây.
"""
from typing import List

# ========================
# Model Configuration
# ========================
MODEL_CONFIG = {
    "n_estimators": 200,
    "min_samples_split": 50,
    "random_state": 1,
}

# Feature selection threshold
FEATURE_THRESHOLD: float = 0.01

# Backtest configuration
BACKTEST_START: int = 50
BACKTEST_STEP: int = 20

# ========================
# Data Configuration
# ========================
DATA_DIR: str = "data"
MODELS_DIR: str = "models"

# Data start date
DATA_START_DATE: str = "2015-01-01"

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
DEFAULT_HOURS_AHEAD: int = 1
PREDICTION_INTERVALS: List[int] = [1, 2, 4, 8, 24]
MULTI_HOUR_PREDICTIONS: List[int] = [1, 2, 3, 4]

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
