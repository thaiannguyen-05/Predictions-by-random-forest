
import pandas as pd
from sklearn.metrics import precision_score, accuracy_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import TimeSeriesSplit
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

    tscv = TimeSeriesSplit(n_splits=5)
    X = fpt[selected_predictors]
    y = fpt["Target"]
    precision_list, accuracy_list, recall_list, f1_list = [], [], [], []
    fold = 1
    for train_idx, test_idx in tscv.split(X):
        X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
        y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]
        model = create_model()
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        precision_list.append(precision_score(y_test, y_pred))
        accuracy_list.append(accuracy_score(y_test, y_pred))
        recall_list.append(recall_score(y_test, y_pred))
        f1_list.append(f1_score(y_test, y_pred))
        print(f"Fold {fold}:")
        print("  Precision:", precision_score(y_test, y_pred))
        print("  Accuracy:", accuracy_score(y_test, y_pred))
        print("  Recall:", recall_score(y_test, y_pred))
        print("  F1-score:", f1_score(y_test, y_pred))
        print("  Confusion matrix:\n", confusion_matrix(y_test, y_pred))
        fold += 1
    print("\nTrung bình các fold:")
    print("Precision:", sum(precision_list)/len(precision_list))
    print("Accuracy:", sum(accuracy_list)/len(accuracy_list))
    print("Recall:", sum(recall_list)/len(recall_list))
    print("F1-score:", sum(f1_list)/len(f1_list))


if __name__ == "__main__":
    main()
