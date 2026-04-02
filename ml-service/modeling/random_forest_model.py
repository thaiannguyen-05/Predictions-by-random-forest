"""
Model module cho ML Service.
Xử lý việc train, predict và backtest model Random Forest.
"""
import os
import pickle
import logging
from typing import List, Tuple, Optional, Dict, Any

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

from core.config import (
    MODEL_CONFIG,
    FEATURE_THRESHOLD,
    BACKTEST_START,
    BACKTEST_STEP,
    MODELS_DIR,
    RF_TUNING_GRID,
    RF_THRESHOLD_GRID,
    get_csv_path,
    get_model_path,
)
from core.exceptions import InsufficientDataException, ModelTrainingException

# Configure logging
logger = logging.getLogger(__name__)


def create_model() -> RandomForestClassifier:
    return RandomForestClassifier(
        n_estimators=MODEL_CONFIG["n_estimators"],
        min_samples_split=MODEL_CONFIG["min_samples_split"],
        random_state=MODEL_CONFIG["random_state"],
    )


def predict(
    train: pd.DataFrame,
    test: pd.DataFrame,
    predictors: List[str],
    model: RandomForestClassifier,
) -> pd.Series:
    """
    Dự đoán xu hướng giá cổ phiếu.
    
    Args:
        train: DataFrame dữ liệu training
        test: DataFrame dữ liệu test
        predictors: List tên các features
        model: Model RandomForest
        
    Returns:
        Series chứa predictions (0: giảm, 1: tăng)
    """
    # Train model
    model.fit(train[predictors], train["Target"])
    
    # Dự đoán xác suất cổ phiếu tăng
    preds_proba = model.predict_proba(test[predictors])[:, 1]
    
    # Quy đổi về nhãn: >= 0.5 → tăng
    preds = (preds_proba >= 0.5).astype(int)
    
    return pd.Series(preds, index=test.index, name="Predictions")


def backtest(
    data: pd.DataFrame,
    model: RandomForestClassifier,
    predictors: List[str],
    start: int = BACKTEST_START,
    step: int = BACKTEST_STEP,
) -> pd.DataFrame:
    """
    Backtest model trên dữ liệu lịch sử.
    
    Args:
        data: DataFrame chứa toàn bộ dữ liệu
        model: Model RandomForest
        predictors: List tên các features
        start: Số dòng dùng để train ban đầu
        step: Số ngày test mỗi iteration
        
    Returns:
        DataFrame chứa kết quả backtest
        
    Raises:
        InsufficientDataException: Khi không đủ dữ liệu để backtest
    """
    all_predictions = []
    
    if len(data) < start:
        raise InsufficientDataException(
            ticker="unknown",
            required=start,
            available=len(data),
        )
    
    for i in range(start, data.shape[0], step):
        train = data.iloc[0:i].copy()
        test = data.iloc[i:(i + step)].copy()
        
        if test.empty:
            continue
        
        preds = predict(train, test, predictors, model)
        combined = pd.concat([test["Target"], preds], axis=1)
        all_predictions.append(combined)
    
    if not all_predictions:
        raise InsufficientDataException(
            ticker="unknown",
            required=start + step,
            available=len(data),
        )
    
    result = pd.concat(all_predictions)
    logger.info(f"Backtest completed: {len(result)} predictions")
    
    return result


def select_features(
    df: pd.DataFrame,
    predictors: List[str],
    threshold: float = FEATURE_THRESHOLD,
) -> Tuple[List[str], pd.Series]:
    """
    Chọn features quan trọng để giảm thời gian train và tránh overfitting.
    
    Args:
        df: DataFrame chứa dữ liệu
        predictors: List tất cả predictors
        threshold: Ngưỡng importance tối thiểu
        
    Returns:
        Tuple[List features được chọn, Series feature importances]
    """
    model = create_model()
    model.fit(df[predictors], df["Target"])
    
    # Lấy feature importances
    feat_importances = pd.Series(model.feature_importances_, index=predictors)
    feat_importances = feat_importances.sort_values(ascending=False)
    
    # Giữ features có importance > threshold
    selected = feat_importances[feat_importances > threshold].index.tolist()
    
    logger.info(f"Selected {len(selected)}/{len(predictors)} features (threshold={threshold})")
    
    return selected, feat_importances


def train_all_models() -> None:
    """Train models cho tất cả tickers và lưu vào file .pkl."""
    from core.config import TICKERS
    from data_pipeline.data_loader import load_data
    from data_pipeline.features import add_features
    
    os.makedirs(MODELS_DIR, exist_ok=True)
    
    success_count = 0
    failed_count = 0
    
    for ticker in TICKERS:
        try:
            csv_file = get_csv_path(ticker)
            model_file = get_model_path(ticker)
            
            logger.info(f"Training model for {ticker}...")
            
            # Load data
            df = load_data(ticker, csv_file)
            
            # Add features
            df, predictors = add_features(df)
            
            # Select important features
            selected_predictors, feat_importances = select_features(
                df, predictors, threshold=FEATURE_THRESHOLD
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
            
            logger.info(f"Trained {ticker} with {len(selected_predictors)} features")
            success_count += 1
            
        except Exception as e:
            logger.error(f"Error training {ticker}: {e}")
            failed_count += 1
    
    logger.info(f"Training complete: {success_count} success, {failed_count} failed")


def load_model_file(model_file: str) -> Optional[dict]:
    """
    Load model từ file.

    Args:
        model_file: Đường dẫn file model

    Returns:
        Dictionary chứa model data hoặc None nếu không tìm thấy
    """
    try:
        if os.path.exists(model_file):
            with open(model_file, "rb") as f:
                return pickle.load(f)
        return None
    except Exception as e:
        logger.error(f"Error loading model from {model_file}: {e}")
        return None


def tune_model_with_validation(
    train_df: pd.DataFrame,
    val_df: pd.DataFrame,
    predictors: List[str],
) -> Dict[str, Any]:
    """
    Tune RandomForest với grid nhỏ và chọn threshold tốt nhất theo accuracy.

    Returns:
        {
            "model": fitted_model,
            "threshold": best_threshold,
            "best_params": {...},
            "validation_accuracy": float,
        }
    """
    if train_df.empty or val_df.empty:
        raise ModelTrainingException("train_df and val_df must be non-empty for tuning")

    if not predictors:
        raise ModelTrainingException("predictors must be non-empty for tuning")

    best_model: Optional[RandomForestClassifier] = None
    best_threshold = 0.5
    best_params: Dict[str, Any] = {
        "n_estimators": MODEL_CONFIG["n_estimators"],
        "min_samples_split": MODEL_CONFIG["min_samples_split"],
    }
    best_acc = -1.0

    for n_estimators in RF_TUNING_GRID["n_estimators"]:
        for min_samples_split in RF_TUNING_GRID["min_samples_split"]:
            model = RandomForestClassifier(
                n_estimators=n_estimators,
                min_samples_split=min_samples_split,
                random_state=MODEL_CONFIG["random_state"],
            )
            model.fit(train_df[predictors], train_df["Target"])
            preds_proba = model.predict_proba(val_df[predictors])[:, 1]

            for threshold in RF_THRESHOLD_GRID:
                preds = (preds_proba >= threshold).astype(int)
                acc = float(accuracy_score(val_df["Target"], preds))
                if acc > best_acc:
                    best_acc = acc
                    best_threshold = float(threshold)
                    best_model = model
                    best_params = {
                        "n_estimators": int(n_estimators),
                        "min_samples_split": int(min_samples_split),
                    }

    if best_model is None:
        raise ModelTrainingException("Failed to tune RandomForest model")

    return {
        "model": best_model,
        "threshold": best_threshold,
        "best_params": best_params,
        "validation_accuracy": best_acc,
    }
