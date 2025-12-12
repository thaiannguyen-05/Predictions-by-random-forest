"""
Data loader module cho ML Service.
Xử lý việc load và update dữ liệu cổ phiếu từ yfinance.
"""
import os
import logging
from typing import Optional

import pandas as pd
import yfinance as yf

from config import (
    TICKERS,
    DATA_DIR,
    DATA_START_DATE,
    get_csv_path,
    standardize_ticker,
)
from exceptions import DataLoadException

# Configure logging
logger = logging.getLogger(__name__)


def load_data(ticker: str, csv_file: Optional[str] = None) -> pd.DataFrame:
    """
    Load dữ liệu từ file CSV hoặc từ yfinance.
    
    Args:
        ticker: Mã cổ phiếu (VD: FPT hoặc FPT.VN)
        csv_file: Đường dẫn file CSV (optional, sẽ tự động tạo nếu không truyền)
        
    Returns:
        DataFrame chứa dữ liệu lịch sử giá
        
    Raises:
        DataLoadException: Khi không thể load dữ liệu
    """
    standardized_ticker = standardize_ticker(ticker)
    
    if csv_file is None:
        csv_file = get_csv_path(standardized_ticker)
    
    try:
        # Nếu file CSV đã tồn tại thì đọc trực tiếp
        if os.path.exists(csv_file):
            df = pd.read_csv(csv_file, index_col=0)
            df.index = pd.to_datetime(df.index)
            logger.debug(f"Loaded {len(df)} rows from {csv_file}")
        else:
            # Nếu chưa có file thì tải dữ liệu từ yfinance
            logger.info(f"Downloading data for {standardized_ticker}")
            df = yf.Ticker(standardized_ticker).history(period="max")
            
            if df.empty:
                raise DataLoadException(standardized_ticker, "No data available from yfinance")
            
            # Tạo thư mục data nếu chưa có
            os.makedirs(os.path.dirname(csv_file), exist_ok=True)
            df.to_csv(csv_file)
            logger.info(f"Saved {len(df)} rows to {csv_file}")

        # Lọc dữ liệu từ năm 2015 để tránh dữ liệu quá ít
        df = df.loc[DATA_START_DATE:].copy()
        
        if df.empty:
            raise DataLoadException(
                standardized_ticker, 
                f"No data available after {DATA_START_DATE}"
            )
        
        return df
        
    except DataLoadException:
        raise
    except Exception as e:
        logger.error(f"Error loading data for {standardized_ticker}: {e}")
        raise DataLoadException(standardized_ticker, str(e))


def update_all_data(force_update: bool = False) -> None:
    """
    Update data cho tất cả tickers trong danh sách.
    
    Args:
        force_update: Nếu True, tải lại toàn bộ data từ yfinance
    """
    os.makedirs(DATA_DIR, exist_ok=True)
    
    success_count = 0
    failed_count = 0
    
    for ticker in TICKERS:
        try:
            csv_file = get_csv_path(ticker)
            
            if force_update or not os.path.exists(csv_file):
                logger.info(f"Downloading data for {ticker}...")
                df = yf.Ticker(ticker).history(period="max")
                
                if df.empty:
                    logger.warning(f"No data available for {ticker}")
                    failed_count += 1
                    continue
                    
                df.to_csv(csv_file)
                logger.info(f"Saved {len(df)} rows for {ticker}")
                success_count += 1
            else:
                logger.debug(f"{ticker} already has data")
                success_count += 1
                
        except Exception as e:
            logger.error(f"Error processing {ticker}: {e}")
            failed_count += 1
    
    logger.info(f"Update complete: {success_count} success, {failed_count} failed")


def update_single_ticker(ticker: str) -> bool:
    """
    Update dữ liệu cho một ticker cụ thể.
    
    Args:
        ticker: Mã cổ phiếu
        
    Returns:
        True nếu update thành công, False nếu thất bại
    """
    try:
        standardized_ticker = standardize_ticker(ticker)
        csv_file = get_csv_path(standardized_ticker)
        
        # Lấy dữ liệu mới từ yfinance
        logger.info(f"Updating data for {standardized_ticker}")
        ticker_obj = yf.Ticker(standardized_ticker)
        new_data = ticker_obj.history(period="5d")
        
        if new_data.empty:
            logger.warning(f"No new data for {standardized_ticker}")
            return False
        
        # Đọc dữ liệu cũ nếu có
        if os.path.exists(csv_file):
            old_data = pd.read_csv(csv_file, index_col=0)
            old_data.index = pd.to_datetime(old_data.index)
            
            # Kết hợp dữ liệu cũ và mới
            combined_data = pd.concat([old_data, new_data])
            combined_data = combined_data[~combined_data.index.duplicated(keep="last")]
            combined_data = combined_data.sort_index()
        else:
            os.makedirs(os.path.dirname(csv_file), exist_ok=True)
            combined_data = new_data
        
        # Lưu dữ liệu
        combined_data.to_csv(csv_file)
        logger.info(f"Updated {standardized_ticker}: {len(combined_data)} total rows")
        return True
        
    except Exception as e:
        logger.error(f"Error updating {ticker}: {e}")
        return False
