# Phân Tích Học Thuật Hệ Thống Dự Đoán Giá Cổ Phiếu (`ml-service`)

## 1. Phát biểu bài toán
Hệ thống giải bài toán **phân loại nhị phân xu hướng giá** cho từng mã cổ phiếu (ticker) theo hướng:
- Lớp `1`: giá trong tương lai tăng so với hiện tại.
- Lớp `0`: giá trong tương lai không tăng (giảm/đi ngang theo định nghĩa nhãn hiện tại).

Trong mã nguồn, nhãn được xây dựng tại `features.py`:
- `Tomorrow = Close.shift(-horizon)`
- `Target = 1[Tomorrow > Close]`

Với mặc định hiện tại `horizon = 5`, bài toán đang được huấn luyện như một bài toán dự đoán xu hướng ở mốc tương lai T+5 phiên (không phải hồi quy trực tiếp giá).

## 2. Mô hình học máy được sử dụng
Hệ thống sử dụng mô hình **Random Forest Classifier** của `scikit-learn` (`sklearn.ensemble.RandomForestClassifier`), được khởi tạo tại `model.py` (`create_model`).

### 2.1. Cấu hình mô hình
Cấu hình trung tâm nằm trong `config.py` (`MODEL_CONFIG`):
- `n_estimators = 200`: số lượng cây quyết định trong rừng.
- `min_samples_split = 50`: số mẫu tối thiểu để tách một nút.
- `random_state = 1`: cố định seed để tái lập kết quả.

### 2.2. Ý nghĩa học thuật của lựa chọn mô hình
Random Forest là phương pháp **ensemble bagging** trên cây quyết định, phù hợp với dữ liệu tài chính vì:
- Mô hình hóa được quan hệ phi tuyến giữa biến đầu vào và nhãn.
- Ít yêu cầu chuẩn hóa dữ liệu so với một số mô hình tuyến tính.
- Có chỉ số `feature_importances_` hỗ trợ giải thích và chọn đặc trưng.
- Giảm overfitting tương đối so với cây đơn nhờ trung bình hóa trên nhiều cây.

## 3. Kỹ thuật tạo đặc trưng (Feature Engineering)
Các đặc trưng được sinh tại `features.py` từ chuỗi OHLCV lịch sử.

## 3.1. Nhóm đặc trưng xu hướng/tương quan với trung bình trượt
Với mỗi cửa sổ `X` trong `ROLLING_HORIZONS = [2, 5, 30, 90, 250]`:
- `Close_Ratio_X = Close_t / MA_X(Close)_t`
- `Trend_X = sum(Target_{t-i}), i=1..X` (thực hiện bằng `Target.shift(1).rolling(X).sum()`)

Ý nghĩa:
- `Close_Ratio_X` phản ánh trạng thái định giá tương đối ngắn/trung/dài hạn.
- `Trend_X` phản ánh quán tính xu hướng (momentum persistence).

## 3.2. Nhóm đặc trưng độ trễ giá
Với `LAG_PERIODS = [1, 2, 3, 5, 10]`:
- `Lag_k = Close_{t-k}`

Ý nghĩa: mã hóa cấu trúc tự tương quan theo thời gian.

## 3.3. Nhóm đặc trưng lợi suất và biến động
- `Return_t = (Close_t - Close_{t-1}) / Close_{t-1}`
- Với `RETURN_WINDOWS = [5, 20]`:
  - `RollingMeanRet_X = mean(Return_{t-X+1:t})`
  - `RollingMedianRet_X = median(Return_{t-X+1:t})`
  - `Volatility_X = std(Return_{t-X+1:t})`

Ý nghĩa:
- Mean/Median return biểu diễn drift ngắn hạn.
- Volatility biểu diễn mức độ rủi ro/dao động cục bộ.

## 3.4. Nhóm đặc trưng khối lượng
Nếu có cột `Volume`:
- `Volume_Ratio_X = Volume_t / MA_X(Volume)_t`, với `X in [5, 20]`.

Ý nghĩa: đo mức độ bất thường thanh khoản tương đối so với nền lịch sử gần.

## 3.5. Làm sạch dữ liệu
Sau khi tạo đặc trưng, hệ thống `dropna()` để loại các dòng đầu chuỗi không đủ dữ liệu rolling/lag.

## 4. Cơ chế chọn đặc trưng (Feature Selection)
Hệ thống áp dụng lọc đặc trưng dựa trên độ quan trọng của Random Forest tại `model.py` (`select_features`):
1. Huấn luyện một Random Forest trên toàn bộ `predictors`.
2. Trích xuất `feature_importances_`.
3. Giữ các đặc trưng có importance lớn hơn ngưỡng `FEATURE_THRESHOLD = 0.01`.

Đây là cơ chế **embedded feature selection** (lọc theo mô hình), giúp:
- Giảm chiều dữ liệu đầu vào.
- Giảm thời gian huấn luyện/suy luận.
- Hạn chế overfitting khi có nhiều biến dư thừa.

## 5. Quy trình huấn luyện (Training Pipeline)
Quy trình huấn luyện cho một ticker (trong `RealTimePrediction.train_model` và `model.train_all_models`):
1. **Nạp dữ liệu** (`data_loader.load_data`): đọc từ CSV nếu có, nếu không tải từ Yahoo Finance (`yfinance`).
2. **Cắt mốc thời gian** từ `DATA_START_DATE = "2015-01-01"`.
3. **Tạo đặc trưng** (`add_features`).
4. **Chọn đặc trưng** (`select_features`, ngưỡng 0.01).
5. **Huấn luyện mô hình cuối** trên tập đặc trưng đã chọn.
6. **Lưu mô hình** dạng pickle (`models/*_model.pkl`) kèm:
   - `model`
   - `selected_predictors`
   - `ticker`

Lưu ý học thuật: hiện tại pipeline huấn luyện trực tiếp trên toàn bộ dữ liệu sau xử lý, chưa có bước tách train/validation độc lập trong hàm train realtime mặc định.

## 6. Cơ chế suy luận (Inference)
Khi nhận yêu cầu dự đoán (`tcp_server.py`, command `predict`):
1. Tải model từ file; nếu chưa có thì huấn luyện mới.
2. Cập nhật dữ liệu gần nhất từ Yahoo Finance.
3. Tái tạo đặc trưng và lấy hàng dữ liệu mới nhất.
4. Tính xác suất lớp tăng bằng `predict_proba(x_t)[1]`.
5. Ánh xạ nhãn:
   - `prob >= 0.5` -> `TĂNG`
   - `prob < 0.5` -> `GIẢM`
6. Độ tin cậy (`confidence`) được tính là `max(prob, 1 - prob)`.

## 7. Ước lượng giá dự đoán (Predicted Price)
Ngoài phân loại xu hướng, hệ thống xấp xỉ giá dự kiến tại `real_time_prediction.py` bằng heuristic dựa trên biến động:
1. Tính volatility ngày trên 20 phiên gần nhất:
   - `sigma_daily = std(pct_change(Close))`
2. Quy đổi sang volatility giờ:
   - `sigma_hourly = sigma_daily / sqrt(TRADING_HOURS_PER_DAY)`
3. Biến động theo `hours_ahead`:
   - scale theo `sqrt(hours_ahead)`
4. Biên độ thay đổi giá:
   - `delta = direction * confidence * sigma_hourly * sqrt(hours_ahead)`
5. Giá dự báo:
   - `predicted_price = current_price * (1 + delta)`

Trong đó `direction = +1` nếu dự báo tăng, `-1` nếu dự báo giảm.

Đây là xấp xỉ mang tính vận hành, không phải một mô hình hồi quy giá độc lập.

## 8. Đánh giá mô hình và backtest
`model.py` có hàm `backtest` theo kiểu **walk-forward**:
- Dùng đoạn đầu để train (`BACKTEST_START = 50`).
- Dự đoán từng block kế tiếp (`BACKTEST_STEP = 20`).
- Gộp toàn bộ dự đoán để đánh giá ngoài mẫu theo dòng thời gian.

Cách này phù hợp với dữ liệu chuỗi thời gian vì giảm rò rỉ thông tin từ tương lai.

## 9. Kiến trúc triển khai dịch vụ
Thành phần chính:
- `data_loader.py`: tải/cập nhật dữ liệu thị trường.
- `features.py`: sinh tập đặc trưng.
- `model.py`: tạo model, chọn feature, backtest, huấn luyện hàng loạt.
- `real_time_prediction.py`: quản lý train/load/predict theo ticker.
- `tcp_server.py`: giao tiếp TCP dạng JSON (`predict`, `train_single`, `update_data`, `get_current_price`, ...).
- `config.py`: quản lý toàn bộ tham số cấu hình.
- `exceptions.py`: chuẩn hóa lỗi nghiệp vụ.

## 10. Hạn chế phương pháp và hướng cải thiện
Các điểm cần nêu rõ khi trình bày học thuật:
1. Nhãn nhị phân chỉ phản ánh hướng, chưa phản ánh độ lớn biến động lợi nhuận.
2. Chưa có quy trình tối ưu siêu tham số hệ thống (grid/random/Bayesian search).
3. Chưa có pipeline validation cố định theo từng giai đoạn thị trường.
4. Dữ liệu phụ thuộc Yahoo Finance; chất lượng dữ liệu có thể dao động theo nguồn.
5. Ước lượng `predicted_price` là heuristic từ volatility, không phải output trực tiếp của mô hình hồi quy.

Hướng nâng cấp:
- Chuyển sang `TimeSeriesSplit` cho tuning và đánh giá chuẩn hóa.
- Thử `XGBoost/LightGBM/CatBoost` cho so sánh benchmark.
- Bổ sung đặc trưng vi mô thị trường hoặc macro/news sentiment.
- Tách riêng bài toán direction classification và magnitude regression.

## 11. Kết luận
Hệ thống hiện tại là một pipeline dự đoán xu hướng cổ phiếu dựa trên Random Forest, kết hợp feature engineering tài chính cổ điển và cơ chế chọn đặc trưng theo feature importance. Thiết kế phù hợp để triển khai vận hành thực tế ở mức baseline, dễ mở rộng, và có khả năng giải thích tương đối thông qua cấu trúc đặc trưng cùng mức quan trọng của chúng.
