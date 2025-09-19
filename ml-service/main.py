import pandas as pd
from sklearn.metrics import precision_score

from data_loader import load_data
from features import add_features
from model import create_model, backtest

# ========================
# Chạy pipeline dự đoán cho FPT.VN
# ========================
def main():
    ticker = "FPT.VN"
    csv_file = "fpt_vn.csv"

    # Load dữ liệu
    fpt = load_data(ticker, csv_file)

    # Sinh thêm features
    fpt, predictors = add_features(fpt)

    print("Số dòng dữ liệu FPT.VN sau khi dropna:", fpt.shape[0])

    # Khởi tạo model Random Forest
    model = create_model()

    # Backtest
    predictions = backtest(fpt, model, predictors, start=50, step=20)

    # Kết quả
    print("Precision:", precision_score(predictions["Target"], predictions["Predictions"]))
    print(predictions.head())  # in 5 dòng đầu kết quả

if __name__ == "__main__":
    main()
