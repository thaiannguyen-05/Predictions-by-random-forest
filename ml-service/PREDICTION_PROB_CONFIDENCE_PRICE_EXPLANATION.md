# Chi tiết cách tính `prediction_prob`, `prediction`, `confidence`, `predicted_price`

Tài liệu này mô tả đúng theo code hiện tại trong `ml-service/real_time_prediction.py` và `ml-service/features.py`.

## 1. Đầu vào trước khi dự đoán

Trước khi tính các giá trị dự đoán, hệ thống làm các bước:
- Cập nhật dữ liệu mới từ Yahoo Finance (`update_data()`).
- Load lại dữ liệu CSV.
- Sinh feature bằng `add_features(df)`.
- Lấy đúng các cột đã được chọn khi train (`self.selected_predictors`).
- Chỉ lấy **1 dòng mới nhất** để dự đoán:

```python
latest_data = df[self.selected_predictors].iloc[-1:]
```

Vì `latest_data` chỉ có 1 mẫu, nên kết quả xác suất sẽ có dạng 1 dòng.

## 2. `prediction_prob` được tính như thế nào

Code:

```python
prediction_prob = self.model.predict_proba(latest_data)[0][1]
```

Ý nghĩa:
- `self.model` là `RandomForestClassifier` đã train.
- `predict_proba(latest_data)` trả về ma trận xác suất theo từng lớp.
- Với bài toán này có 2 lớp:
  - `0`: GIẢM
  - `1`: TĂNG
- `[0]`: lấy dòng đầu tiên (và cũng là duy nhất) của mẫu vừa đưa vào.
- `[1]`: lấy xác suất của lớp `1` (TĂNG).

Ví dụ:
- Nếu `predict_proba(...)` trả `[[0.32, 0.68]]` thì:
  - `prediction_prob = 0.68`.

## 3. Quy đổi xác suất thành nhãn `prediction`

Code:

```python
prediction = int(prediction_prob >= 0.5)
```

Ý nghĩa:
- Nếu xác suất tăng >= 0.5 thì dự đoán là tăng (`1`).
- Ngược lại dự đoán là giảm (`0`).

Ví dụ:
- `prediction_prob = 0.68` -> `prediction = 1` (TĂNG).
- `prediction_prob = 0.41` -> `prediction = 0` (GIẢM).

## 4. Tính `confidence` (độ tin tưởng)

Code:

```python
confidence = max(prediction_prob, 1 - prediction_prob)
```

Ý nghĩa:
- Độ tin tưởng là xác suất của lớp được chọn (lớn hơn giữa tăng và giảm).
- Luôn nằm trong đoạn `[0.5, 1.0]`.
- Càng xa mốc `0.5` thì model càng tự tin.

Ví dụ:
- `prediction_prob = 0.68` -> `confidence = max(0.68, 0.32) = 0.68`.
- `prediction_prob = 0.41` -> `confidence = max(0.41, 0.59) = 0.59`.
- `prediction_prob = 0.50` -> `confidence = 0.50` (thấp nhất).

## 5. Lấy giá hiện tại (`current_price`)

Code lấy từ Yahoo Finance:

```python
current_data = ticker_obj.history(period="1d", interval="1m")
current_price = float(current_data["Close"].iloc[-1])
```

Ý nghĩa:
- Lấy dữ liệu intraday 1 phút trong 1 ngày gần nhất.
- Dùng `Close` mới nhất làm giá hiện tại để tính `predicted_price`.

## 6. Tính `predicted_price` bằng heuristic volatility

Hàm: `_calculate_predicted_price(...)`

### 6.1. Trường hợp fallback (dữ liệu quá ít)

Nếu `len(df) <= 1` thì dùng công thức đơn giản:

```python
direction = 1 if prediction == 1 else -1
price_change_pct = direction * confidence * DEFAULT_HOURLY_PRICE_CHANGE * hours_ahead
predicted_price = current_price * (1 + price_change_pct)
```

Trong đó `DEFAULT_HOURLY_PRICE_CHANGE = 0.02` (2%/giờ).

### 6.2. Trường hợp bình thường (đủ dữ liệu)

Công thức đang dùng:

1. Lấy 20 phiên đóng cửa gần nhất:

```python
recent_data = df["Close"].tail(20)
```

2. Tính daily return:

```python
daily_returns = recent_data.pct_change().dropna()
```

3. Tính độ biến động ngày (std):

```python
volatility = daily_returns.std()
```

4. Quy đổi sang biến động theo giờ:

```python
hourly_volatility = volatility / (TRADING_HOURS_PER_DAY ** 0.5)
```

Với config hiện tại: `TRADING_HOURS_PER_DAY = 8`.

5. Xác định hướng tăng/giảm:

```python
direction = 1 if prediction == 1 else -1
```

6. Tính hệ số thay đổi giá:

```python
price_change_factor = direction * confidence * hourly_volatility * (hours_ahead ** 0.5)
```

7. Tính giá dự đoán:

```python
predicted_price = current_price * (1 + price_change_factor)
```

## 7. Ví dụ số đầy đủ

Giả sử:
- `current_price = 100.0`
- `prediction_prob = 0.70` -> `prediction = 1`
- `confidence = max(0.70, 0.30) = 0.70`
- `volatility = 0.02` (2% daily std)
- `TRADING_HOURS_PER_DAY = 8`
- `hours_ahead = 4`

Tính:

1. `hourly_volatility = 0.02 / sqrt(8) = 0.007071`
2. `price_change_factor = +1 * 0.70 * 0.007071 * sqrt(4)`
3. `price_change_factor = 0.0098994` (~0.99%)
4. `predicted_price = 100 * (1 + 0.0098994) = 100.98994`

Kết quả: giá dự đoán khoảng **100.99**.

## 8. Lưu ý quan trọng

- `predicted_price` **không** phải output trực tiếp của Random Forest regression.
- Random Forest ở đây chỉ dự đoán xác suất hướng tăng/giảm (`prediction_prob`).
- Giá chi tiết được suy ra bằng công thức heuristic: hướng (`direction`) + độ tin tưởng (`confidence`) + biến động lịch sử (`volatility`) + thời gian dự đoán (`sqrt(hours_ahead)`).

## 9. Mapping biến trả về API

Khi trả kết quả, hệ thống đóng gói:
- `prediction`: "TĂNG" hoặc "GIẢM"
- `probability`: chính là `prediction_prob`
- `confidence`: như công thức ở trên
- `predicted_price`: từ `_calculate_predicted_price(...)`

Các field này được trả trong `predict_next_hours(...)`.
