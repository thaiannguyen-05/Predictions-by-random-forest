# Lộ Trình Học Để Hiểu Và Trình Bày `ml-service`

Mục tiêu: Sau khi học xong tài liệu này, bạn có thể giải thích đầy đủ hệ thống trong 10-15 phút và trả lời phản biện kỹ thuật.

## 1) Bạn phải học những gì (theo thứ tự ưu tiên)

## 1.1. Bài toán ML của hệ thống
Bạn cần trả lời được:
- Hệ thống đang giải bài toán gì?
- Dự đoán cái gì: hướng tăng/giảm hay giá tuyệt đối?

Bạn phải nắm:
- Đây là **binary classification**.
- Nhãn `Target` được tạo từ `Close.shift(-horizon) > Close`.
- Mặc định hiện tại trong code: `horizon = 5`.

File cần đọc:
- `ml-service/features.py`

## 1.2. Mô hình được dùng
Bạn cần trả lời được:
- Mô hình tên gì? Vì sao chọn nó?
- Tham số chính ảnh hưởng như thế nào?

Bạn phải nắm:
- Dùng `RandomForestClassifier`.
- Config hiện tại:
  - `n_estimators = 200`
  - `min_samples_split = 50`
  - `random_state = 1`
- Ý nghĩa học thuật của Random Forest: bagging, giảm overfitting tương đối so với 1 cây, xử lý phi tuyến tốt.

File cần đọc:
- `ml-service/model.py`
- `ml-service/config.py`

## 1.3. Feature engineering
Bạn cần trả lời được:
- Hệ thống tạo những feature nào?
- Từng feature phản ánh tín hiệu gì?

Bạn phải nắm:
- `Close_Ratio_X`, `Trend_X`, `Lag_X`
- `Return`, `RollingMeanRet_X`, `RollingMedianRet_X`
- `Volatility_X`, `Volume_Ratio_X`
- Vì sao phải `dropna()` sau rolling/lag.

File cần đọc:
- `ml-service/features.py`
- `ml-service/config.py`

## 1.4. Quy trình train
Bạn cần trả lời được:
- Từ dữ liệu thô tới model `.pkl` đi qua các bước nào?

Bạn phải nắm:
- Pipeline: `load_data -> add_features -> select_features -> fit -> save model`.
- `select_features()` dùng `feature_importances_` với ngưỡng `FEATURE_THRESHOLD = 0.01`.
- Model lưu gồm: model, selected predictors, ticker.

File cần đọc:
- `ml-service/data_loader.py`
- `ml-service/model.py`
- `ml-service/real_time_prediction.py`

## 1.5. Cách hệ thống dự đoán khi chạy thật
Bạn cần trả lời được:
- Request đi vào server thế nào?
- Khi chưa có model thì hệ thống làm gì?

Bạn phải nắm:
- TCP server nhận JSON command (`predict`, `train`, `update_data`, ...).
- Nếu chưa trained: load model file, không có thì train mới.
- Dự đoán từ hàng dữ liệu mới nhất với `predict_proba`.
- Rule nhãn: `prob >= 0.5` là tăng.
- `confidence = max(prob, 1 - prob)`.

File cần đọc:
- `ml-service/tcp_server.py`
- `ml-service/real_time_prediction.py`

## 1.6. Backtest và đánh giá
Bạn cần trả lời được:
- Backtest trong project là kiểu gì?
- Vì sao không shuffle dữ liệu time-series?

Bạn phải nắm:
- `backtest()` dạng walk-forward.
- `BACKTEST_START = 50`, `BACKTEST_STEP = 20`.
- Time-series phải train trên quá khứ và test trên tương lai.

File cần đọc:
- `ml-service/model.py`

## 1.7. Giới hạn và phản biện
Bạn cần trả lời được:
- Hệ thống còn yếu ở đâu?
- Nếu cải tiến thì làm gì trước?

Bạn phải nắm:
- Chưa tuning hyperparameter sâu.
- `predicted_price` là heuristic theo volatility, không phải regression model riêng.
- Data phụ thuộc Yahoo Finance.
- Cải tiến: TimeSeriesSplit, tuning, thêm feature, benchmark với boosting.

---

## 2) Học đến mức nào là đạt

Mức đạt để trình bày tốt:
- Bạn giải thích được toàn bộ pipeline không nhìn code.
- Bạn chỉ được đúng đoạn code tạo nhãn, train model, predict.
- Bạn trả lời được tối thiểu 8/10 câu phản biện phổ biến.

---

## 3) Kế hoạch học gấp trong 2 ngày

## Ngày 1 (T4): Hiểu kiến trúc và pipeline
1. Đọc `config.py`, `data_loader.py`, `features.py`, `model.py`, `tcp_server.py`.
2. Vẽ 1 sơ đồ duy nhất:
   - data source -> feature -> train -> model file -> server -> response.
3. Viết ra giấy 5 công thức chính:
   - Target, Return, Volatility, rule threshold, confidence.

## Ngày 2 (T5): Luyện phản biện và trình bày
1. Tự trình bày 10 phút theo flow:
   - bài toán -> feature -> model -> train -> serving -> hạn chế.
2. Tự trả lời các câu:
   - vì sao Random Forest?
   - vì sao threshold 0.01?
   - vì sao không LSTM ngay?
   - làm sao tránh leakage?
3. Chốt 1 slide “hạn chế + roadmap cải tiến”.

---

## 4) Checklist tự kiểm cuối cùng
- [ ] Nói rõ được mô hình dùng gì và config cụ thể.
- [ ] Giải thích được toàn bộ nhóm feature và ý nghĩa.
- [ ] Mô tả chuẩn train pipeline từng bước.
- [ ] Mô tả chuẩn inference pipeline từng bước.
- [ ] Giải thích được backtest walk-forward.
- [ ] Nêu được ít nhất 3 hạn chế kỹ thuật hiện tại.
- [ ] Trình bày trôi chảy 10-15 phút không phụ thuộc tài liệu.

---

## 5) Tài liệu code cần bám sát
- `ml-service/config.py`
- `ml-service/data_loader.py`
- `ml-service/features.py`
- `ml-service/model.py`
- `ml-service/real_time_prediction.py`
- `ml-service/tcp_server.py`
- `ml-service/ML_SERVICE_ACADEMIC_EXPLANATION.md`
