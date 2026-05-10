"""
Bootstrap dữ liệu và model Random Forest dùng cho prediction service.
"""

import os
import pickle
import sys
import time
from pathlib import Path
from typing import List

BASE_DIR = Path(__file__).resolve().parent
os.chdir(BASE_DIR)
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from core.config import DATA_START_DATE, TICKERS, get_model_path  # noqa: E402
from data_pipeline.data_loader import update_all_data  # noqa: E402
from modeling.random_forest_model import train_all_models  # noqa: E402


def _validate_generated_models(started_at: float) -> List[str]:
    errors: List[str] = []

    for ticker in TICKERS:
        model_path = Path(get_model_path(ticker))
        if not model_path.exists():
            errors.append(f"{ticker}: missing model file {model_path}")
            continue

        try:
            with model_path.open("rb") as model_file:
                model_data = pickle.load(model_file)
        except Exception as exc:
            errors.append(f"{ticker}: cannot load model file ({exc})")
            continue

        model = model_data.get("model")
        selected_predictors = model_data.get("selected_predictors")
        saved_ticker = model_data.get("ticker")
        threshold = model_data.get("threshold")
        best_params = model_data.get("best_params")
        feature_importances = model_data.get("feature_importances")
        oob_score = model_data.get("oob_score")
        data_start_date = model_data.get("data_start_date")

        if model is None or not hasattr(model, "predict_proba"):
            errors.append(f"{ticker}: invalid model object")
        if not selected_predictors:
            errors.append(f"{ticker}: missing selected predictors")
        if saved_ticker != ticker:
            errors.append(f"{ticker}: saved ticker mismatch ({saved_ticker})")
        if not isinstance(threshold, (int, float)) or not 0 < float(threshold) < 1:
            errors.append(f"{ticker}: missing or invalid probability threshold")
        if not best_params:
            errors.append(f"{ticker}: missing tuned Random Forest params")
        if not feature_importances:
            errors.append(f"{ticker}: missing feature importances")
        if not isinstance(oob_score, (int, float)):
            errors.append(f"{ticker}: missing OOB score")
        if data_start_date != DATA_START_DATE:
            errors.append(
                f"{ticker}: data start date mismatch ({data_start_date} != {DATA_START_DATE})"
            )

    return errors


def main() -> int:
    print("=" * 80)
    print("SETUP - Chuẩn bị dữ liệu và train models")
    print("=" * 80)

    started_at = time.time()

    print("\n1. Đang update data cho 40 tickers...")
    update_all_data(force_update=True)

    print("\n2. Đang train Random Forest models cho 40 tickers...")
    train_all_models()

    print("\n3. Đang kiểm tra model artifacts...")
    errors = _validate_generated_models(started_at)
    if errors:
        print("\nSETUP CHƯA HOÀN TẤT. Một số model không sẵn sàng để predict:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print("\n" + "=" * 80)
    print("HOÀN TẤT! Server đã sẵn sàng để chạy")
    print("=" * 80)
    print("\nBây giờ bạn có thể chạy:")
    print("  python -m server.tcp_server")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
