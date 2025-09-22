
import pandas as pd
from sklearn.metrics import precision_score, accuracy_score, recall_score, f1_score, confusion_matrix

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
    y_true = predictions["Target"]
    y_pred = predictions["Predictions"]
    print("Precision:", precision_score(y_true, y_pred))
    print("Accuracy:", accuracy_score(y_true, y_pred)) # ti le du doan dung tren toan bo tap du lieu
    print("Recall:", recall_score(y_true, y_pred)) # ty le du doan dung cac truong hop tang gia thuc su ( kha nang phat hien dung cac truong hop duong tinh)
    print("F1-score:", f1_score(y_true, y_pred)) # trung binh dieu hoa giua presision va recall , giup can bang giua 2 chi so nay
    print("Confusion matrix:\n", confusion_matrix(y_true, y_pred)) # ma tran the hien so luong du doan dung/sai cho tung lop (tang/giam) giup ban nhin ro mo hinh dang mac loi gi
    print(predictions.head())  # in 5 dòng đầu kết quả


if __name__ == "__main__":
    main()
