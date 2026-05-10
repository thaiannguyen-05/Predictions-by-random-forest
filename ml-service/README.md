# ML Service - Hướng dẫn xây dựng và hiểu toàn bộ dự án

Tài liệu này mô tả chi tiết cách dựng, chạy và hiểu toàn bộ luồng xử lý của dự án `ml-service` trong thư mục:
`/home/andev/dev/projects/Predictions-by-random-forest/ml-service`

## 1. Mục tiêu dự án

`ml-service` là service Python dự đoán xu hướng tăng/giảm giá cổ phiếu (chủ yếu mã VN) bằng mô hình classification.

Service thực hiện 3 nhóm việc chính:
1. Quản lý dữ liệu lịch sử giá (CSV cache + cập nhật từ Yahoo Finance).
2. Train/load model ML (mặc định Random Forest, có thêm các model khác để so sánh).
3. Expose API nội bộ qua TCP socket (JSON request/response) cho backend khác gọi.

## 2. Kiến trúc tổng quan

Luồng chính:
1. Nhận request JSON qua TCP server (`server/tcp_server.py`).
2. Route theo `command` (`predict`, `train`, `compare`, ...).
3. Với command dự đoán: dùng `RealTimePrediction` (`services/real_time_prediction.py`).
4. Service cập nhật dữ liệu, tạo features, load/train model nếu cần
5. Trả JSON response chứa kết quả dự đoán/xử lý.

Các module lõi:
- `core/config.py`: toàn bộ constants (model params, feature windows, server config, ticker list...).
- `data_pipeline/data_loader.py`: load/update dữ liệu từ CSV hoặc Yahoo Finance.
- `data_pipeline/features.py`: feature engineering + tạo nhãn `Target`.
- `modeling/*.py`: định nghĩa model và chọn features.
- `services/real_time_prediction.py`: nghiệp vụ realtime train/load/predict.
- `orchestration/model_training_orchestrator.py`: train nhiều model và compare model.
- `server/tcp_server.py`: TCP server + command handlers.
- `setup.py`: bootstrap nhanh (download dữ liệu và train random forest cho toàn bộ ticker).

## 3. Cấu trúc thư mục

```text
ml-service/
  core/
    config.py
    exceptions.py
    type_defs.py
  data_pipeline/
    data_loader.py
    features.py
  modeling/
    random_forest_model.py
    decision_tree_model.py
    bagging_model.py
    hist_gradient_boosting_model.py
  orchestration/
    model_training_orchestrator.py
  services/
    real_time_prediction.py
  server/
    tcp_server.py
  data/             # CSV data theo ticker
  models/           # model .pkl theo ticker
  setup.py
  tcp_server.py     # wrapper entrypoint tương thích ngược
  requirements.txt
```

## 4. Quy ước dữ liệu, ticker và file

### 4.1 Chuẩn hóa ticker

Hàm: `core.config.standardize_ticker(ticker)`

Quy tắc:
1. Uppercase ticker.
2. Nếu chưa có `.VN` thì thêm `.VN`.

Ví dụ:
- `fpt` -> `FPT.VN`
- `VCB` -> `VCB.VN`
- `VHM.VN` -> `VHM.VN`

### 4.2 Đường dẫn dữ liệu và model

- CSV data: `data/{TICKER_REPLACED}_stock_data.csv`
  - Ví dụ: `FPT.VN` -> `data/FPT_VN_stock_data.csv`
- Random forest model mặc định: `models/{TICKER_REPLACED}_model.pkl`
  - Ví dụ: `FPT.VN` -> `models/FPT_VN_model.pkl`
- Model khác (orchestrator) sẽ thêm hậu tố:
  - `models/FPT_VN_hist_gradient_boosting_model.pkl`
  - `models/FPT_VN_decision_tree_model.pkl`
  - `models/FPT_VN_bagging_model.pkl`

## 5. Hướng dẫn xây dựng dự án từ đầu (step-by-step)

### Bước 1: Chuẩn bị môi trường

Yêu cầu:
- Python 3.10+ (khuyến nghị 3.10 hoặc 3.11)
- Kết nối mạng để lấy dữ liệu từ Yahoo Finance

Cài dependencies:

```bash
cd /home/andev/dev/projects/Predictions-by-random-forest/ml-service
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

`requirements.txt` hiện tại:
- `yfinance>=0.2.28`
- `pandas>=2.0.0`
- `scikit-learn>=1.3.0`
- `numpy>=1.24.0`

### Bước 2: Bootstrap dữ liệu và model baseline

Chạy lệnh:

```bash
python setup.py
```

`setup.py` sẽ làm 2 việc:
1. `update_all_data(force_update=True)` tải lại dữ liệu lịch sử cho danh sách `TICKERS` trong `core/config.py`.
2. `train_all_models()` train Random Forest cho toàn bộ ticker và lưu `.pkl` vào `models/`.

Sau bước này bạn sẽ có:
- Dữ liệu CSV trong `data/`
- Model Random Forest cho từng ticker trong `models/`

### Bước 3: Khởi chạy TCP server

Có 2 cách:

```bash
python -m server.tcp_server
```

hoặc

```bash
python tcp_server.py
```

Server mặc định bind:
- Host: `0.0.0.0`
- Port: `9999`

Config nằm trong `core/config.py`:
- `SERVER_HOST`, `SERVER_PORT`, `SOCKET_BUFFER_SIZE`, `MAX_CONNECTIONS`

### Bước 4: Test server bằng request JSON

Ví dụ ping:

```bash
echo '{"command":"ping"}' | nc 127.0.0.1 9999
```

Ví dụ train 1 ticker:

```bash
echo '{"command":"train","ticker":"FPT"}' | nc 127.0.0.1 9999
```

Ví dụ predict 24h (command `predict` chỉ hỗ trợ 24h):

```bash
echo '{"command":"predict","ticker":"FPT","hours_ahead":24}' | nc 127.0.0.1 9999
```

Ví dụ multi-hour:

```bash
echo '{"command":"predict_multi_hours","ticker":"FPT"}' | nc 127.0.0.1 9999
```

## 6. Data pipeline chi tiết

### 6.1 Load dữ liệu (`data_pipeline/data_loader.py`)

Hàm chính: `load_data(ticker, csv_file=None)`

Luồng:
1. Chuẩn hóa ticker.
2. Nếu có CSV local thì đọc CSV.
3. Nếu chưa có CSV thì gọi `yfinance.Ticker(...).history(period="max")` để tải dữ liệu.
4. Lọc dữ liệu từ `DATA_START_DATE` (hiện tại `2015-01-01`).
5. Trả DataFrame đã parse datetime index.

Hàm update:
- `update_all_data(force_update=False)`: chạy cho toàn bộ ticker list.
- `update_single_ticker(ticker)`: update từng ticker bằng `history(period="5d")`, merge với CSV cũ, khử duplicate theo index.

### 6.2 Sinh feature (`data_pipeline/features.py`)

Hàm: `add_features(df, horizon=5)`

Nhãn dự đoán:
- `Tomorrow = Close.shift(-horizon)`
- `Target = (Tomorrow > Close).astype(int)`

Nhóm features:
1. `Close_Ratio_X`, `Trend_X` theo `ROLLING_HORIZONS=[2,5,30,90,250]`.
2. `Lag_X` theo `LAG_PERIODS=[1,2,3,5,10]`.
3. `Return`, `RollingMeanRet_X`, `RollingMedianRet_X` theo `RETURN_WINDOWS=[5,20]`.
4. `Volatility_X` theo `RETURN_WINDOWS`.
5. `Volume_Ratio_X` nếu cột `Volume` tồn tại.

Cuối cùng `dropna()` và trả `(df_with_features, predictors)`.

## 7. Modeling layer chi tiết

### 7.1 Random Forest (`modeling/random_forest_model.py`)

Model:
- `RandomForestClassifier(n_estimators=200, min_samples_split=50, random_state=1)`

Feature selection:
1. Fit model với toàn bộ predictors.
2. Lấy `feature_importances_`.
3. Chọn feature có importance `> FEATURE_THRESHOLD` (mặc định `0.01`).

### 7.2 Decision Tree (`modeling/decision_tree_model.py`)

Model:
- `DecisionTreeClassifier(min_samples_split=50, random_state=1)`

Feature selection: dùng `feature_importances_` tương tự random forest.

### 7.3 Bagging (`modeling/bagging_model.py`)

Model:
- `BaggingClassifier` với base estimator là `DecisionTreeClassifier`.
- `n_estimators=200`.

Feature selection:
- Lấy importance trung bình từ các estimators con.

### 7.4 Hist Gradient Boosting (`modeling/hist_gradient_boosting_model.py`)

Model:
- `HistGradientBoostingClassifier(max_iter=200, learning_rate=0.05, min_samples_leaf=50, random_state=1)`

Feature selection:
- Dùng chung logic `select_features` của random forest.

## 8. Nghiệp vụ realtime prediction (`services/real_time_prediction.py`)

Class chính: `RealTimePrediction`

### 8.1 Train model (`train_model`)

Luồng:
1. Load data.
2. Add features.
3. Select features.
4. Tạo Random Forest và `fit`.
5. Lưu model bằng pickle (`save_model`).

Dữ liệu lưu model:
- `model`
- `selected_predictors`
- `ticker`

### 8.2 Load model (`load_model`)

Nếu file model tồn tại:
1. `pickle.load(...)`
2. Nạp vào `self.model`, `self.selected_predictors`
3. `self.is_trained = True`

### 8.3 Predict (`predict_next_hours`)

Precondition: model đã train/load.

Luồng:
1. `update_data()` lấy dữ liệu mới nhất.
2. Load data và add features lại.
3. Lấy dòng mới nhất theo `selected_predictors`.
4. `predict_proba` để lấy xác suất tăng (`probability`).
5. Quy đổi nhãn dự đoán:
   - `>= threshold` -> `TĂNG`
   - `< threshold` -> `GIẢM`
   - `threshold` được tune theo validation cho từng ticker khi train, mặc định tối ưu F1 của class `TĂNG` để tránh ngưỡng hiếm khi phát tín hiệu tăng, rồi lưu trong file model.
6. `confidence = max(prob, 1 - prob)`.
7. Lấy `current_price` từ `history(period="1d", interval="1m")`.
8. Tính `predicted_price` bằng heuristic volatility.

Công thức giá dự đoán (trường hợp đủ dữ liệu):
1. Lấy close 20 phiên gần nhất.
2. Tính daily return std (`volatility`).
3. Quy đổi hourly volatility: `volatility / sqrt(TRADING_HOURS_PER_DAY)`.
4. `price_change_factor = direction * confidence * hourly_volatility * sqrt(hours_ahead)`.
5. `predicted_price = current_price * (1 + price_change_factor)`.

Lưu ý:
- `predicted_price` là giá suy diễn heuristic, không phải output direct regression model.

### 8.4 Prediction report (`get_prediction_report`)

Loop qua `PREDICTION_INTERVALS=[1,2,3,24]` và gọi `predict_next_hours` cho từng mốc.

## 9. TCP Server và command map (`server/tcp_server.py`)

### 9.1 Startup server

`StockPredictionTCPServer.start_server()`:
1. Tạo socket TCP.
2. `SO_REUSEADDR=1`.
3. `bind(host, port)`.
4. `listen(5)`.
5. `accept()` trong loop.
6. Mỗi kết nối tạo 1 thread xử lý `handle_client_request`.

### 9.2 Command được hỗ trợ

- `ping`
- `get_current_price`
- `get_financial_data`
- `train`, `train_single`
- `predict`
- `predict_multi_hours`
- `prediction_report`
- `update_data`
- `train_all`, `train_all_models_recent`
- `compare`

### 9.3 Rule quan trọng

- `predict` chỉ chấp nhận `hours_ahead=24` (`DEFAULT_HOURS_AHEAD`).
- Nếu model chưa có:
  - `predict` và `predict_multi_hours` sẽ thử `load_model()` rồi auto-train nếu cần.
  - `prediction_report` chỉ load model, không auto-train.
- Request đọc bằng `recv(4096)` theo `SOCKET_BUFFER_SIZE`.

## 10. Orchestrator train nhiều model (`orchestration/model_training_orchestrator.py`)

### 10.1 `train_all_models_recent(...)`

Input chính:
- `recent_weeks`: chỉ nhận `1` hoặc `2`.
- `model_types`: list optional (`random_forest`, `hist_gradient_boosting`, `decision_tree`, `bagging`).
- `tickers`: list optional.

Luồng:
1. Validate input.
2. Load data và add features theo từng ticker.
3. Lọc dữ liệu cửa sổ gần nhất theo `recent_weeks`.
4. Với mỗi model type:
   - chọn features
   - train
   - lưu model ra file
5. Trả report tổng hợp `trained_jobs`, `failed_jobs`, `success_rate`, `model_summary`, `results`.

### 10.2 `evaluate_models(ticker, recent_days=365)`

Luồng so sánh model:
1. Load + feature engineering.
2. Lọc cửa sổ `recent_days` gần nhất.
3. Chia train/test theo rule nội bộ.
4. Train từng model trong `MODEL_REGISTRY`.
5. Tính metrics: `accuracy`, `mae`, `rmse`, `mape`.
6. Trả danh sách kết quả theo model.

## 11. Các config quan trọng cần nắm (`core/config.py`)

- Model:
  - `MODEL_CONFIG`
  - `FEATURE_THRESHOLD`
- Backtest:
  - `BACKTEST_START`, `BACKTEST_STEP`
- Data:
  - `DATA_DIR`, `MODELS_DIR`, `DATA_START_DATE`
- Features:
  - `ROLLING_HORIZONS`, `LAG_PERIODS`, `RETURN_WINDOWS`
- Prediction:
  - `TRADING_HOURS_PER_DAY`
  - `DEFAULT_HOURS_AHEAD=24`
  - `PREDICTION_INTERVALS=[1,2,3,24]`
  - `MULTI_HOUR_PREDICTIONS=[1,2,3]`
  - `DEFAULT_HOURLY_PRICE_CHANGE=0.02`
- Server:
  - `SERVER_HOST`, `SERVER_PORT`, `SOCKET_BUFFER_SIZE`, `MAX_CONNECTIONS`
- Ticker:
  - `TICKER_SUFFIX='.VN'`
  - `TICKERS` (danh sách mã mặc định)

## 12. JSON request/response mẫu

### 12.1 Request tối thiểu

```json
{
  "command": "predict",
  "ticker": "FPT",
  "hours_ahead": 24
}
```

### 12.2 Response success (ví dụ)

```json
{
  "success": true,
  "ticker": "FPT",
  "current_price": 124.5,
  "current_time": "2026-03-20T10:10:00+07:00",
  "prediction_time": "2026-03-21T10:10:00.000000",
  "prediction": "TĂNG",
  "probability": 0.67,
  "confidence": 0.67,
  "hours_ahead": 24,
  "timestamp": "2026-03-20T10:10:01.000000"
}
```

### 12.3 Response lỗi (ví dụ)

```json
{
  "success": false,
  "error": "Missing ticker parameter"
}
```

## 13. Quy trình phát triển tính năng mới

Nếu bạn muốn thêm model/feature/command mới, đi theo thứ tự này:
1. Sửa config nếu cần (`core/config.py`).
2. Mở rộng data pipeline (`data_loader.py`, `features.py`).
3. Thêm model vào `modeling/` và đăng ký trong `MODEL_REGISTRY`.
4. Thêm handler command ở `server/tcp_server.py`.
5. Cập nhật response schema nhất quán.
6. Test nhanh bằng `nc` hoặc client TCP.

## 14. Debug checklist nhanh

1. Không predict được:
- Kiểm tra model file có tồn tại trong `models/`.
- Gọi command `train` trước.
- Kiểm tra CSV của ticker trong `data/`.

2. Dữ liệu rỗng:
- Kiểm tra ticker chuẩn (`FPT` -> `FPT.VN`).
- Chạy `update_data` hoặc `python setup.py`.

3. `train_all_models_recent` lỗi:
- `recent_weeks` phải là `1` hoặc `2`.
- `model_types` phải thuộc `SUPPORTED_MODEL_TYPES`.

4. Server socket lỗi:
- Kiểm tra port `9999` có bị chiếm không.
- Kiểm tra process server đang chạy.

## 15. Tài liệu bổ sung

- Giải thích sâu về `probability`, `confidence`, `predicted_price`:
  - `PREDICTION_PROB_CONFIDENCE_PRICE_EXPLANATION.md`

---

Nếu bạn muốn, bước tiếp theo mình có thể bổ sung thêm một file `docs/REQUEST_EXAMPLES.md` chứa đầy đủ request/response cho từng command để frontend/backend tích hợp nhanh hơn.
