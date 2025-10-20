import os
import pickle
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

# chon feature quan trong , giam thoi gian train , tranh overfitting
def select_features(df, predictors, threshold=0.01):
    # train model tren toan bo du lieu de tinh importance 
    # giu lai feature co importance > threshold

    model = create_model()
    model.fit(df[predictors], df["Target"])

    # lay importance
    feat_importances = pd.Series(model.feature_importances_, index = predictors)
    feat_importances = feat_importances.sort_values(ascending=False)

    # Giữ feature quan trọng hơn threshold
    selected = feat_importances[feat_importances > threshold].index.tolist()
    return selected, feat_importances


# ========================
# Train models cho tất cả tickers
# ========================
def train_all_models() -> None:
    """Train models cho tất cả tickers và lưu vào file .pkl"""
    from data_loader import TICKERS, load_data
    from features import add_features
    
    os.makedirs("models", exist_ok=True)
    
    for ticker in TICKERS:
        try:
            csv_file = f"data/{ticker.replace('.', '_')}_stock_data.csv"
            model_file = f"models/{ticker.replace('.', '_')}_model.pkl"
            
            print(f"\nĐang train model cho {ticker}...")
            
            # Load data
            df = load_data(ticker, csv_file)
            
            # Add features
            df, predictors = add_features(df)
            
            # Select important features
            selected_predictors, feat_importances = select_features(
                df, predictors, threshold=0.01
            )
            
            # Train model
            model = create_model()
            model.fit(df[selected_predictors], df["Target"])
            
            # Save model
            model_data = {
                "model": model,
                "selected_predictors": selected_predictors,
                "ticker": ticker,
            }
            
            with open(model_file, "wb") as f:
                pickle.dump(model_data, f)
            
            print(f"  ✓ Đã train với {len(selected_predictors)} features")
            print(f"  ✓ Đã lưu vào {model_file}")
            
        except Exception as e:
            print(f"  ✗ Lỗi khi train {ticker}: {e}")
