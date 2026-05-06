"""
Model module cho ML Service.
Xử lý Random Forest Regression cho bài toán dự đoán giá.
"""
import logging
from typing import Any, Dict, List, Tuple

import pandas as pd
from sklearn.ensemble import RandomForestRegressor

from core.config import MODEL_CONFIG, FEATURE_THRESHOLD
from core.exceptions import ModelTrainingException

logger = logging.getLogger(__name__)


def create_model() -> RandomForestRegressor:
    return RandomForestRegressor(
        n_estimators=MODEL_CONFIG["n_estimators"],
        min_samples_split=MODEL_CONFIG["min_samples_split"],
        random_state=MODEL_CONFIG["random_state"],
    )


def select_features(
    df: pd.DataFrame,
    predictors: List[str],
    threshold: float = FEATURE_THRESHOLD,
    target_column: str = "TargetPrice",
) -> Tuple[List[str], pd.Series]:
    if target_column not in df.columns:
        raise ModelTrainingException(f"Missing target column: {target_column}")

    model = create_model()
    model.fit(df[predictors], df[target_column])

    feat_importances = pd.Series(model.feature_importances_, index=predictors)
    feat_importances = feat_importances.sort_values(ascending=False)

    selected = feat_importances[feat_importances > threshold].index.tolist()

    logger.info(
        f"Selected {len(selected)}/{len(predictors)} features for regression (threshold={threshold})"
    )

    return selected, feat_importances


def evaluate_predictions(
    y_true: pd.Series,
    y_pred: Any,
) -> Dict[str, Any]:
    import numpy as np

    y_true_np = y_true.to_numpy(dtype=float)
    y_pred_np = np.asarray(y_pred, dtype=float)

    errors = y_pred_np - y_true_np

    mae = float(np.mean(np.abs(errors)))
    rmse = float(np.sqrt(np.mean(errors ** 2)))

    non_zero_mask = y_true_np != 0
    if non_zero_mask.any():
        mape = float(np.mean(np.abs(errors[non_zero_mask] / y_true_np[non_zero_mask])))
    else:
        mape = 0.0

    denom = float(np.sum((y_true_np - np.mean(y_true_np)) ** 2))
    r2 = 0.0
    if denom > 0:
        r2 = float(1 - (np.sum(errors ** 2) / denom))

    return {
        "mae": mae,
        "rmse": rmse,
        "mape": mape,
        "r2": r2,
    }
