import os
import yfinance as yf
import pandas as pd

# ========================
# Load dữ liệu từ file CSV hoặc từ yfinance
# ========================
def load_data(ticker: str, csv_file: str) -> pd.DataFrame:
    # Nếu file CSV đã tồn tại thì đọc trực tiếp
    if os.path.exists(csv_file):
        df = pd.read_csv(csv_file, index_col=0)
        df.index = pd.to_datetime(df.index)
    else:
        # Nếu chưa có file thì tải dữ liệu từ yfinance
        df = yf.Ticker(ticker).history(period="max")
        if df.empty:
            raise ValueError(f"Không tải được dữ liệu cho {ticker}")
        df.to_csv(csv_file)

    # Lọc dữ liệu từ năm 2015 để tránh dữ liệu quá ít
    df = df.loc["2015-01-01":].copy()
    return df
