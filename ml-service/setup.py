"""
Chạy file này 1 lần đầu tiên để chuẩn bị data và train models
"""

from data_loader import update_all_data, TICKERS
from model import train_all_models

print("=" * 80)
print("SETUP - Chuẩn bị dữ liệu và train models")
print("=" * 80)

# Bước 1: Update data
print("\n1. Đang update data cho 40 tickers...")
update_all_data(force_update=True)

# Bước 2: Train models
print("\n2. Đang train models cho 40 tickers...")
train_all_models()

print("\n" + "=" * 80)
print("✓ HOÀN TẤT! Server đã sẵn sàng để chạy")
print("=" * 80)
print("\nBây giờ bạn có thể chạy:")
print("  python tcp_server.py")
