"""
Real-time prediction module cho ML Service.
Cung cấp các phương thức dự đoán giá cổ phiếu real-time.
"""
import os
import pickle
import logging
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any

import pandas as pd
import yfinance as yf

from config import (
    TRADING_HOURS_PER_DAY,
    DEFAULT_HOURLY_PRICE_CHANGE,
    PREDICTION_INTERVALS,
    standardize_ticker,
    get_csv_path,
    get_model_path,
)
from data_loader import load_data
from features import add_features
from model import create_model, select_features
from exceptions import (
    ModelNotTrainedException,
    PredictionException,
    PriceDataException,
)
from type_defs import PriceInfo, FinancialData, PredictionResult

# Configure logging
logger = logging.getLogger(__name__)


class RealTimePrediction:
    """
    Class xử lý dự đoán giá cổ phiếu real-time.
    
    Attributes:
        ticker: Mã cổ phiếu (đã chuẩn hóa)
        csv_file: Đường dẫn file CSV chứa dữ liệu
        model_file: Đường dẫn file model
        model: Model RandomForest đã train
        selected_predictors: Danh sách features được chọn
        is_trained: Trạng thái model đã train hay chưa
    """
    
    def __init__(
        self,
        ticker: str = "FPT.VN",
        csv_file: Optional[str] = None,
        model_file: Optional[str] = None,
    ):
        """
        Khởi tạo RealTimePrediction.
        
        Args:
            ticker: Mã cổ phiếu
            csv_file: Đường dẫn file CSV (optional)
            model_file: Đường dẫn file model (optional)
        """
        self.ticker = standardize_ticker(ticker)
        self.csv_file = csv_file or get_csv_path(self.ticker)
        self.model_file = model_file or get_model_path(self.ticker)
        self.model = None
        self.selected_predictors: Optional[List[str]] = None
        self.is_trained = False

    def get_current_price(self) -> Optional[Dict[str, Any]]:
        """
        Lấy giá hiện tại của cổ phiếu.
        
        Returns:
            Dictionary chứa price, time, symbol hoặc None nếu lỗi
        """
        try:
            ticker_obj = yf.Ticker(self.ticker)
            current_data = ticker_obj.history(period="1d", interval="1m")
            
            if not current_data.empty:
                current_price = float(current_data["Close"].iloc[-1])
                current_time = current_data.index[-1]
                return {
                    "price": current_price,
                    "time": current_time,
                    "symbol": self.ticker,
                }
            
            logger.warning(f"No price data for {self.ticker}")
            return None
            
        except Exception as e:
            logger.error(f"Error getting price for {self.ticker}: {e}")
            return None

    def get_financial_data(self) -> Optional[Dict[str, Any]]:
        """
        Lấy thông tin tài chính chi tiết của cổ phiếu.
        
        Returns:
            Dictionary chứa thông tin tài chính hoặc None nếu lỗi
        """
        try:
            ticker_obj = yf.Ticker(self.ticker)
            info = ticker_obj.info
            hist = ticker_obj.history(period="1d")
            
            financial_data = {
                "ticker": self.ticker,
                "previous_close": info.get("previousClose"),
                "open": hist["Open"].iloc[-1] if not hist.empty else info.get("open"),
                "high": hist["High"].iloc[-1] if not hist.empty else info.get("dayHigh"),
                "low": hist["Low"].iloc[-1] if not hist.empty else info.get("dayLow"),
                "volume": int(hist["Volume"].iloc[-1]) if not hist.empty else info.get("volume"),
                "market_cap": info.get("marketCap"),
                "pe_ratio": info.get("trailingPE"),
                "eps": info.get("trailingEps"),
                "beta": info.get("beta"),
                "yahoo_price": info.get("regularMarketPrice") or info.get("currentPrice"),
            }
            
            return financial_data
            
        except Exception as e:
            logger.error(f"Error getting financial data for {self.ticker}: {e}")
            return None

    def update_data(self) -> bool:
        """
        Cập nhật dữ liệu mới nhất từ yfinance.
        
        Returns:
            True nếu thành công, False nếu thất bại
        """
        try:
            ticker_obj = yf.Ticker(self.ticker)
            new_data = ticker_obj.history(period="5d")
            
            if os.path.exists(self.csv_file):
                old_data = pd.read_csv(self.csv_file, index_col=0)
                old_data.index = pd.to_datetime(old_data.index)
                
                combined_data = pd.concat([old_data, new_data])
                combined_data = combined_data[~combined_data.index.duplicated(keep="last")]
                combined_data = combined_data.sort_index()
            else:
                os.makedirs(os.path.dirname(self.csv_file), exist_ok=True)
                combined_data = new_data
            
            combined_data.to_csv(self.csv_file)
            logger.info(f"Updated data for {self.ticker}")
            return True
            
        except Exception as e:
            logger.error(f"Error updating data for {self.ticker}: {e}")
            return False

    def train_model(self) -> bool:
        """
        Train model với dữ liệu mới nhất.
        
        Returns:
            True nếu thành công, False nếu thất bại
        """
        try:
            # Load dữ liệu
            df = load_data(self.ticker, self.csv_file)
            
            # Sinh features
            df, predictors = add_features(df)
            
            # Chọn features quan trọng
            self.selected_predictors, feat_importances = select_features(
                df, predictors, threshold=0.01
            )
            
            # Train model
            self.model = create_model()
            self.model.fit(df[self.selected_predictors], df["Target"])
            self.is_trained = True
            
            # Lưu model
            self.save_model()
            
            logger.info(f"Trained model for {self.ticker} with {len(self.selected_predictors)} features")
            logger.debug(f"Top 10 features: {list(feat_importances.head(10).index)}")
            
            return True
            
        except Exception as e:
            logger.error(f"Error training model for {self.ticker}: {e}")
            return False

    def save_model(self) -> None:
        """Lưu model đã train vào file."""
        model_data = {
            "model": self.model,
            "selected_predictors": self.selected_predictors,
            "ticker": self.ticker,
        }
        
        os.makedirs(os.path.dirname(self.model_file), exist_ok=True)
        
        with open(self.model_file, "wb") as f:
            pickle.dump(model_data, f)
        
        logger.info(f"Saved model to {self.model_file}")

    def load_model(self) -> bool:
        """
        Load model đã train từ file.
        
        Returns:
            True nếu thành công, False nếu không tìm thấy hoặc lỗi
        """
        try:
            if os.path.exists(self.model_file):
                with open(self.model_file, "rb") as f:
                    model_data = pickle.load(f)
                
                self.model = model_data["model"]
                self.selected_predictors = model_data["selected_predictors"]
                self.is_trained = True
                
                logger.info(f"Loaded model from {self.model_file}")
                return True
            
            logger.warning(f"Model file not found: {self.model_file}")
            return False
            
        except Exception as e:
            logger.error(f"Error loading model from {self.model_file}: {e}")
            return False

    def predict_next_hours(self, hours_ahead: int = 1) -> Optional[Dict[str, Any]]:
        """
        Dự đoán xu hướng giá trong vài giờ tới.
        
        Args:
            hours_ahead: Số giờ muốn dự đoán (1-24)
            
        Returns:
            Dictionary chứa kết quả dự đoán hoặc None nếu lỗi
        """
        if not self.is_trained:
            logger.warning(f"Model for {self.ticker} is not trained")
            return None
        
        try:
            # Cập nhật dữ liệu
            self.update_data()
            
            # Load dữ liệu
            df = load_data(self.ticker, self.csv_file)
            
            # Sinh features
            df, _ = add_features(df)
            
            # Lấy dữ liệu mới nhất
            latest_data = df[self.selected_predictors].iloc[-1:]
            
            # Dự đoán
            prediction_prob = self.model.predict_proba(latest_data)[0][1]
            prediction = int(prediction_prob >= 0.5)
            
            # Lấy giá hiện tại
            current_info = self.get_current_price()
            current_price = current_info["price"] if current_info else None
            
            # Tính độ tin cậy
            confidence = max(prediction_prob, 1 - prediction_prob)
            
            # Tính giá dự đoán
            predicted_price = self._calculate_predicted_price(
                current_price=current_price,
                df=df,
                prediction=prediction,
                confidence=confidence,
                hours_ahead=hours_ahead,
            )
            
            return {
                "current_price": current_price,
                "current_time": current_info["time"] if current_info else datetime.now(),
                "prediction_time": datetime.now() + timedelta(hours=hours_ahead),
                "prediction": "TĂNG" if prediction == 1 else "GIẢM",
                "probability": prediction_prob,
                "confidence": confidence,
                "predicted_price": predicted_price,
                "hours_ahead": hours_ahead,
                "symbol": self.ticker,
            }
            
        except Exception as e:
            logger.error(f"Error predicting for {self.ticker}: {e}")
            return None

    def _calculate_predicted_price(
        self,
        current_price: Optional[float],
        df: pd.DataFrame,
        prediction: int,
        confidence: float,
        hours_ahead: int,
    ) -> Optional[float]:
        """
        Tính giá dự đoán dựa trên volatility lịch sử.
        
        Args:
            current_price: Giá hiện tại
            df: DataFrame với dữ liệu lịch sử
            prediction: 1 (tăng) hoặc 0 (giảm)
            confidence: Độ tin cậy (0-1)
            hours_ahead: Số giờ dự đoán
            
        Returns:
            Giá dự đoán hoặc None
        """
        if current_price is None:
            return None
        
        if len(df) <= 1:
            # Fallback với % thay đổi đơn giản
            direction = 1 if prediction == 1 else -1
            price_change_pct = direction * confidence * DEFAULT_HOURLY_PRICE_CHANGE * hours_ahead
            return current_price * (1 + price_change_pct)
        
        # Tính volatility từ 20 ngày gần nhất
        recent_data = df["Close"].tail(20)
        daily_returns = recent_data.pct_change().dropna()
        volatility = daily_returns.std()
        
        # Ước tính volatility theo giờ
        hourly_volatility = volatility / (TRADING_HOURS_PER_DAY ** 0.5)
        
        # Tính % thay đổi
        direction = 1 if prediction == 1 else -1
        price_change_factor = direction * confidence * hourly_volatility * (hours_ahead ** 0.5)
        
        return current_price * (1 + price_change_factor)

    def get_prediction_report(self) -> Optional[List[Dict[str, Any]]]:
        """
        Tạo báo cáo dự đoán cho nhiều khung thời gian.
        
        Returns:
            List các predictions hoặc None nếu model chưa train
        """
        if not self.is_trained:
            logger.warning(f"Model for {self.ticker} is not trained")
            return None
        
        predictions = []
        for hours in PREDICTION_INTERVALS:
            pred = self.predict_next_hours(hours)
            if pred:
                predictions.append(pred)
        
        return predictions
