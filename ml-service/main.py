import pandas as pd
from sklearn.metrics import precision_score

from data_loader import load_data
from features import add_features
from model import create_model, backtest, select_features   # sửa: dùng select_features (số nhiều)

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

    # Chọn features quan trọng (loại bỏ feature yếu)
    selected_predictors, feat_importances = select_features(fpt, predictors, threshold=0.01)
    print("Giữ lại", len(selected_predictors), "features quan trọng.")

    # Khởi tạo model Random Forest
    model = create_model()

    # Backtest với feature đã chọn
    predictions = backtest(fpt, model, selected_predictors, start=50, step=20)

    # Kết quả
    print("Precision:", precision_score(predictions["Target"], predictions["Predictions"]))
    print(predictions.head())  # in 5 dòng đầu kết quả


if __name__ == "__main__":
    main()
