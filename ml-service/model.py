import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# ========================
# Hàm dự đoán
# ========================
def predict(train, test, predictors, model):
    # Train dữ liệu
    model.fit(train[predictors], train["Target"])

    # Dự đoán xác suất cổ phiếu tăng
    preds = model.predict_proba(test[predictors])[:, 1]

    # Quy đổi về nhãn: >= 0.5 → tăng
    preds = (preds >= 0.5).astype(int)

    # Trả về Series dự đoán, index theo ngày
    return pd.Series(preds, index=test.index, name="Predictions")


# ========================
# Hàm backtest
# ========================
def backtest(data, model, predictors, start=50, step=20):
    all_predictions = []

    # Lấy 50 dòng đầu để train, sau đó test 20 ngày tiếp theo
    for i in range(start, data.shape[0], step):
        train = data.iloc[0:i].copy()
        test = data.iloc[i:(i + step)].copy()
        if test.empty:
            continue

        preds = predict(train, test, predictors, model)
        combined = pd.concat([test["Target"], preds], axis=1)
        all_predictions.append(combined)

    if not all_predictions:
        raise ValueError("Không đủ dữ liệu để backtest. Hãy giảm start hoặc step.")

    return pd.concat(all_predictions)


# ========================
# Hàm khởi tạo mô hình Random Forest
# ========================
def create_model():
    return RandomForestClassifier(
        n_estimators=200,       # số lượng cây
        min_samples_split=50,   # giới hạn độ sâu → chống overfit
        random_state=1          # cố định kết quả
    )
