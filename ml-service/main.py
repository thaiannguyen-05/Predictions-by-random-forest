import yfinance as yf  # de tai du lieu tu yfinance
import pandas as pd  # xu li du lieu
from sklearn.ensemble import (
    RandomForestClassifier,
)  # model random forest cho classification
from sklearn.metrics import precision_score  # tinh precision
import os  # lam viec voi file he thong

# ========================
# Lấy dữ liệu FPT.VN
# ========================
ticker = "FPT.VN"  # ticket in yfinance
csv_file = "fpt_vn.csv"  # ticket in file csv

# reading data from file csv
if os.path.exists(csv_file):
    fpt = pd.read_csv(csv_file, index_col=0)
    fpt.index = pd.to_datetime(fpt.index)
else:
    # fallback
    fpt = yf.Ticker(ticker).history(period="max")
    if fpt.empty:
        raise ValueError(f"Không tải được dữ liệu cho {ticker}")
    fpt.to_csv(csv_file)

# ========================
# Tạo biến Target
# ========================
fpt["Tomorrow"] = fpt["Close"].shift(-1)  # gia dong cua cua ngay mai
fpt["Target"] = (fpt["Tomorrow"] > fpt["Close"]).astype(
    int
)  # target = 1 neu ngay mai cao hon ngay hom nay

# Lọc từ 2015 để tránh dữ liệu quá ít
fpt = fpt.loc["2015-01-01":].copy()


# ========================
# Hàm dự đoán & backtest
# ========================
def predict(train, test, predictors, model):
    model.fit(train[predictors], train["Target"])  # train du lieu huan luyen
    preds = model.predict_proba(test[predictors])[:, 1]  # tra ve xac suat co phieu tang
    preds = (preds >= 0.5).astype(int)  # xac suat >= 0.5 => tang
    return pd.Series(
        preds, index=test.index, name="Predictions"
    )  # tra ve Series chua du doan , index theo ngay

# lay 50 dong dau tien sau do test 20 ngay tiep theo
def backtest(data, model, predictors, start=50, step=20):
    all_predictions = [] # list chua results
    for i in range(start, data.shape[0], step):
        train = data.iloc[0:i].copy()
        test = data.iloc[i : (i + step)].copy()
        if test.empty:
            continue
        preds = predict(train, test, predictors, model)
        combined = pd.concat([test["Target"], preds], axis=1) # so sanh voi thuc te
        all_predictions.append(combined)
    if not all_predictions:
        raise ValueError("Không đủ dữ liệu để backtest. Hãy giảm start hoặc step.")
    return pd.concat(all_predictions) # ghep tat ca cac result lai


# ========================
# Tạo thêm features (rolling ratios & trends)
# ========================
horizons = [2, 5, 30, 90, 250]
new_predictors = []

for horizon in horizons:
    rolling_averages = fpt.rolling(horizon).mean()
    fpt[f"Close_Ratio_{horizon}"] = fpt["Close"] / rolling_averages["Close"] # gia hom nay tren gia ngay truoc
    fpt[f"Trend_{horizon}"] = fpt.shift(1).rolling(horizon).sum()["Target"] # so lan tang horizon ngay truoc -> the hien xu huong
    new_predictors += [f"Close_Ratio_{horizon}", f"Trend_{horizon}"] # luu feature 

fpt = fpt.dropna() # loai bo nhung dong thieu du lieu

# ========================
# Kiểm tra dữ liệu & backtest
# ========================
print("Số dòng dữ liệu FPT.VN sau khi dropna:", fpt.shape[0]) # in so dong du lieu con lai

# khoi tao random forest n_estimators=200 ( 200 cay ) , min_samples_split = gioi han do sau(chong overfit), random_state = 1 (co dinh ket qua)
model = RandomForestClassifier(n_estimators=200, min_samples_split=50, random_state=1)

predictions = backtest(fpt, model, new_predictors, start=50, step=20) 

# ========================
# Kết quả
# ========================
print("Precision:", precision_score(predictions["Target"], predictions["Predictions"])) # tinh precision = Tp / (Tp + Fp) -> ti le du doan tang ma thuc su tang
print(predictions) # in 5 dong Target(thuc te) va Predictions (du doan)
