import pandas as pd

# ========================
# Sinh thêm các features cho mô hình
# ========================
def add_features(df: pd.DataFrame):
    # Tạo biến Target (nhãn dự đoán)
    df["Tomorrow"] = df["Close"].shift(-5)  # Giá đóng cửa sau 5 ngay
    df["Target"] = (df["Tomorrow"] > df["Close"]).astype(
        int
    )  # 1 nếu ngày mai cao hơn hôm nay

    # Rolling ratios & xu hướng (trend)
    horizons = [2, 5, 30, 90, 250]
    predictors = []

    for horizon in horizons:
        rolling_averages = df.rolling(horizon).mean()
        df[f"Close_Ratio_{horizon}"] = df["Close"] / rolling_averages["Close"]
        df[f"Trend_{horizon}"] = df.shift(1).rolling(horizon).sum()["Target"]
        predictors += [f"Close_Ratio_{horizon}", f"Trend_{horizon}"]

    # Lag features (dùng giá quá khứ để dự đoán hiện tại)
    for lag in [1, 2, 3, 5, 10]:
        df[f"Lag_{lag}"] = df["Close"].shift(lag)

    # Daily return (lợi suất hàng ngày)
    df["Return"] = df["Close"].pct_change()

    # Rolling mean/median return (xu hướng lợi suất ngắn hạn)
    for window in [5, 20]:
        df[f"RollingMeanRet_{window}"] = df["Return"].rolling(window).mean()
        df[f"RollingMedianRet_{window}"] = df["Return"].rolling(window).median()

    df = df.dropna()
    return df, predictors
