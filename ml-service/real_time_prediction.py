import pandas as pd
import yfinance as yf
import pickle
import os
from datetime import datetime, timedelta
from data_loader import load_data
from features import add_features
from model import create_model, select_features


class RealTimePrediction:
    def __init__(
        self, ticker="FPT.VN", csv_file="fpt_vn.csv", model_file="trained_model.pkl"
    ):
        self.ticker = ticker
        self.csv_file = csv_file
        self.model_file = model_file
        self.model = None
        self.selected_predictors = None
        self.is_trained = False

    def get_current_price(self):
        """Lấy giá hiện tại của cổ phiếu"""
        try:
            ticker_obj = yf.Ticker(self.ticker)
            current_data = ticker_obj.history(period="1d", interval="1m")
            if not current_data.empty:
                current_price = current_data["Close"][-1]
                current_time = current_data.index[-1]
                return {
                    "price": current_price,
                    "time": current_time,
                    "symbol": self.ticker,
                }
            else:
                print(f"Không thể lấy giá hiện tại cho {self.ticker}")
                return None
        except Exception as e:
            print(f"Lỗi khi lấy giá hiện tại: {e}")
            return None

    def update_data(self):
        """Cập nhật dữ liệu mới nhất từ yfinance"""
        try:
            # Lấy dữ liệu mới nhất
            ticker_obj = yf.Ticker(self.ticker)
            new_data = ticker_obj.history(period="5d")  # Lấy 5 ngày gần nhất

            # Đọc dữ liệu cũ nếu có
            if os.path.exists(self.csv_file):
                old_data = pd.read_csv(self.csv_file, index_col=0)
                old_data.index = pd.to_datetime(old_data.index)

                # Kết hợp dữ liệu cũ và mới, loại bỏ trùng lặp
                combined_data = pd.concat([old_data, new_data])
                combined_data = combined_data[
                    ~combined_data.index.duplicated(keep="last")
                ]
                combined_data = combined_data.sort_index()
            else:
                combined_data = new_data

            # Lưu dữ liệu đã cập nhật
            combined_data.to_csv(self.csv_file)
            print(f"Đã cập nhật dữ liệu cho {self.ticker}")
            return True

        except Exception as e:
            print(f"Lỗi khi cập nhật dữ liệu: {e}")
            return False

    def train_model(self):
        """Train model với dữ liệu mới nhất"""
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
            X = df[self.selected_predictors]
            y = df["Target"]

            self.model.fit(X, y)
            self.is_trained = True

            # Lưu model đã train
            self.save_model()

            print(f"Model đã được train với {len(self.selected_predictors)} features")
            print("Top 10 features quan trọng nhất:")
            print(feat_importances.head(10))

            return True

        except Exception as e:
            print(f"Lỗi khi train model: {e}")
            return False

    def save_model(self):
        """Lưu model đã train"""
        model_data = {
            "model": self.model,
            "selected_predictors": self.selected_predictors,
            "ticker": self.ticker,
        }
        with open(self.model_file, "wb") as f:
            pickle.dump(model_data, f)
        print(f"Model đã được lưu vào {self.model_file}")

    def load_model(self):
        """Load model đã train trước đó"""
        try:
            if os.path.exists(self.model_file):
                with open(self.model_file, "rb") as f:
                    model_data = pickle.load(f)

                self.model = model_data["model"]
                self.selected_predictors = model_data["selected_predictors"]
                self.is_trained = True

                print(f"Đã load model từ {self.model_file}")
                return True
            else:
                print(f"Không tìm thấy file model {self.model_file}")
                return False
        except Exception as e:
            print(f"Lỗi khi load model: {e}")
            return False

    def predict_next_hours(self, hours_ahead=1):
        """
        Dự đoán xu hướng giá trong vài giờ tới

        Args:
            hours_ahead: Số giờ muốn dự đoán (1-24)

        Returns:
            dict: Kết quả dự đoán
        """
        if not self.is_trained:
            print("Model chưa được train hoặc load. Vui lòng train model trước.")
            return None

        try:
            # Cập nhật dữ liệu mới nhất
            self.update_data()

            # Load dữ liệu
            df = load_data(self.ticker, self.csv_file)

            # Sinh features
            df, _ = add_features(df)

            # Lấy dòng dữ liệu mới nhất
            latest_data = df[self.selected_predictors].iloc[-1:]

            # Dự đoán
            prediction_prob = self.model.predict_proba(latest_data)[0][
                1
            ]  # Xác suất tăng giá
            prediction = int(prediction_prob >= 0.5)  # 1: tăng, 0: giảm

            # Lấy giá hiện tại
            current_info = self.get_current_price()

            # Tính độ tin cậy
            confidence = max(prediction_prob, 1 - prediction_prob)

            result = {
                "current_price": current_info["price"] if current_info else None,
                "current_time": (
                    current_info["time"] if current_info else datetime.now()
                ),
                "prediction_time": datetime.now() + timedelta(hours=hours_ahead),
                "prediction": "TĂNG" if prediction == 1 else "GIẢM",
                "probability": prediction_prob,
                "confidence": confidence,
                "hours_ahead": hours_ahead,
                "symbol": self.ticker,
            }

            return result

        except Exception as e:
            print(f"Lỗi khi dự đoán: {e}")
            return None

    def get_prediction_report(self):
        """Tạo báo cáo dự đoán chi tiết"""
        if not self.is_trained:
            return "Model chưa được train!"

        predictions = []
        for hours in [1, 2, 4, 8, 24]:
            pred = self.predict_next_hours(hours)
            if pred:
                predictions.append(pred)

        return predictions
