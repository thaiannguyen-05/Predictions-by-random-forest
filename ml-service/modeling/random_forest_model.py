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
from sklearn.metrics import accuracy_score, balanced_accuracy_score, f1_score

from core.config import (
    MODEL_CONFIG,
    FEATURE_THRESHOLD,
    DEFAULT_PROBABILITY_THRESHOLD,
    THRESHOLD_OPTIMIZATION_METRIC,
    BACKTEST_START,
    BACKTEST_STEP,
    DATA_START_DATE,
    MODELS_DIR,
    RF_TUNING_GRID,
    RF_THRESHOLD_GRID,
    get_csv_path,
    get_model_path,
)
from core.exceptions import InsufficientDataException, ModelTrainingException

# Configure logging
logger = logging.getLogger(__name__)


def create_model(model_params: Optional[Dict[str, Any]] = None) -> RandomForestClassifier:
    params = {
        "n_estimators": MODEL_CONFIG["n_estimators"],
        "min_samples_split": MODEL_CONFIG["min_samples_split"],
        "min_samples_leaf": MODEL_CONFIG["min_samples_leaf"],
        "max_depth": MODEL_CONFIG["max_depth"],
        "max_features": MODEL_CONFIG.get("max_features", "sqrt"),
        "class_weight": MODEL_CONFIG.get("class_weight"),
        "bootstrap": MODEL_CONFIG.get("bootstrap", True),
        "max_samples": MODEL_CONFIG.get("max_samples"),
        "n_jobs": MODEL_CONFIG.get("n_jobs"),
        "random_state": MODEL_CONFIG["random_state"],
        "oob_score": True,
    }
    if model_params:
        params.update(model_params)

    if not params.get("bootstrap", True):
        params["oob_score"] = False
        params["max_samples"] = None

    return RandomForestClassifier(
        n_estimators=params["n_estimators"],
        min_samples_split=params["min_samples_split"],
        min_samples_leaf=params["min_samples_leaf"],
        max_depth=params["max_depth"],
        max_features=params["max_features"],
        class_weight=params["class_weight"],
        bootstrap=params["bootstrap"],
        max_samples=params["max_samples"],
        n_jobs=params["n_jobs"],
        random_state=params["random_state"],
        oob_score=params["oob_score"],
    )


def positive_class_probability(
    model: RandomForestClassifier,
    features: pd.DataFrame,
) -> pd.Series:
    predicted_proba = model.predict_proba(features)
    classes = list(getattr(model, "classes_", []))

    if predicted_proba.ndim != 2:
        return pd.Series([0.0] * len(features), index=features.index)

    if predicted_proba.shape[1] == 1:
        only_class = int(classes[0]) if classes else 0
        probability = predicted_proba[:, 0] if only_class == 1 else [0.0] * len(features)
        return pd.Series(probability, index=features.index)

    positive_idx = classes.index(1) if 1 in classes else 1
    return pd.Series(predicted_proba[:, positive_idx], index=features.index)


def select_threshold_from_probabilities(
    probabilities: pd.Series,
    targets: pd.Series,
    thresholds: List[float],
    metric: str = THRESHOLD_OPTIMIZATION_METRIC,
) -> Dict[str, Any]:
    best_threshold = DEFAULT_PROBABILITY_THRESHOLD
    best_score = -1.0
    best_metrics: Dict[str, float] = {
        "accuracy": -1.0,
        "balanced_accuracy": -1.0,
        "f1": -1.0,
    }

    for threshold in thresholds:
        preds = (probabilities >= threshold).astype(int)
        metrics = {
            "accuracy": float(accuracy_score(targets, preds)),
            "balanced_accuracy": float(balanced_accuracy_score(targets, preds)),
            "f1": float(f1_score(targets, preds, zero_division=0)),
        }
        score = metrics.get(metric, metrics["f1"])

        if (
            score > best_score
            or (score == best_score and metrics["balanced_accuracy"] > best_metrics["balanced_accuracy"])
            or (score == best_score and metrics["balanced_accuracy"] == best_metrics["balanced_accuracy"] and metrics["accuracy"] > best_metrics["accuracy"])
        ):
            best_score = score
            best_metrics = metrics
            best_threshold = float(threshold)

    return {
        "threshold": best_threshold,
        "metric": metric,
        "score": best_score,
        "balanced_accuracy": best_metrics["balanced_accuracy"],
        "f1": best_metrics["f1"],
        "accuracy": best_metrics["accuracy"],
    }


def tune_threshold_with_validation(
    train_df: pd.DataFrame,
    val_df: pd.DataFrame,
    predictors: List[str],
) -> Dict[str, Any]:
    if train_df.empty or val_df.empty or not predictors:
        return {
            "threshold": DEFAULT_PROBABILITY_THRESHOLD,
            "validation_accuracy": None,
            "validation_balanced_accuracy": None,
            "validation_f1": None,
        }

    model = create_model()
    model.fit(train_df[predictors], train_df["Target"])
    preds_proba = positive_class_probability(model, val_df[predictors])

    selected = select_threshold_from_probabilities(
        preds_proba,
        val_df["Target"],
        RF_THRESHOLD_GRID,
    )

    return {
        "threshold": selected["threshold"],
        "optimization_metric": selected["metric"],
        "validation_accuracy": selected["accuracy"],
        "validation_balanced_accuracy": selected["balanced_accuracy"],
        "validation_f1": selected["f1"],
    }


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
    preds_proba = positive_class_probability(model, test[predictors])
    
    # Quy đổi về nhãn theo ngưỡng mặc định.
    preds = (preds_proba >= DEFAULT_PROBABILITY_THRESHOLD).astype(int)
    
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


def is_tuned_model_artifact_ready(model_file: str, ticker: str) -> bool:
    try:
        if not os.path.exists(model_file):
            return False

        with open(model_file, "rb") as f:
            model_data = pickle.load(f)

        model = model_data.get("model")
        selected_predictors = model_data.get("selected_predictors")
        threshold = model_data.get("threshold")

        return (
            model_data.get("ticker") == ticker
            and model is not None
            and hasattr(model, "predict_proba")
            and bool(selected_predictors)
            and isinstance(threshold, (int, float))
            and 0 < float(threshold) < 1
            and bool(model_data.get("best_params"))
            and bool(model_data.get("feature_importances"))
            and isinstance(model_data.get("oob_score"), (int, float))
            and model_data.get("data_start_date") == DATA_START_DATE
        )
    except Exception:
        return False


def train_all_models() -> None:
    """Train models cho tất cả tickers và lưu vào file .pkl."""
    from core.config import TICKERS
    from data_pipeline.data_loader import load_data
    from data_pipeline.features import add_features
    
    os.makedirs(MODELS_DIR, exist_ok=True)
    
    success_count = 0
    failed_count = 0
    
    total_tickers = len(TICKERS)

    for idx, ticker in enumerate(TICKERS, start=1):
        try:
            csv_file = get_csv_path(ticker)
            model_file = get_model_path(ticker)

            if is_tuned_model_artifact_ready(model_file, ticker):
                logger.info(f"Skipping {ticker}: tuned artifact already exists")
                print(f"[{idx}/{total_tickers}] Skip {ticker}: model đã sẵn sàng", flush=True)
                success_count += 1
                continue
            
            logger.info(f"Training model for {ticker}...")
            print(f"[{idx}/{total_tickers}] Train {ticker}...", flush=True)
            
            # Load data
            df = load_data(ticker, csv_file)
            
            # Add features
            df, predictors = add_features(df)
            
            split_idx = int(len(df) * 0.8)
            tuning_train_df = df.iloc[:split_idx].copy()
            tuning_val_df = df.iloc[split_idx:].copy()

            # Select important features without peeking at the validation window.
            selected_predictors, feat_importances = select_features(
                tuning_train_df, predictors, threshold=FEATURE_THRESHOLD
            )
            if not selected_predictors:
                selected_predictors = predictors

            tuned = tune_model_with_validation(
                tuning_train_df,
                tuning_val_df,
                selected_predictors,
            )
            
            # Train final production model on all available data.
            model = create_model(tuned["best_params"])
            model.fit(df[selected_predictors], df["Target"])
            final_oob_score = float(getattr(model, "oob_score_", tuned["oob_score"]))
            
            # Save model
            model_data = {
                "model": model,
                "selected_predictors": selected_predictors,
                "ticker": ticker,
                "threshold": tuned["threshold"],
                "threshold_metrics": tuned["threshold_metrics"],
                "best_params": tuned["best_params"],
                "oob_score": final_oob_score,
                "feature_importances": feat_importances.to_dict(),
                "selected_feature_importances": feat_importances[
                    selected_predictors
                ].to_dict(),
                "data_start_date": DATA_START_DATE,
            }
            
            with open(model_file, "wb") as f:
                pickle.dump(model_data, f)
            
            logger.info(f"Trained {ticker} with {len(selected_predictors)} features")
            print(
                f"[{idx}/{total_tickers}] Done {ticker}: "
                f"{len(selected_predictors)} features, "
                f"threshold={tuned['threshold']:.2f}, "
                f"balanced_acc={tuned['validation_balanced_accuracy']:.3f}, "
                f"oob={final_oob_score:.3f}",
                flush=True,
            )
            success_count += 1
            
        except Exception as e:
            logger.error(f"Error training {ticker}: {e}")
            print(f"[{idx}/{total_tickers}] FAIL {ticker}: {e}", flush=True)
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
    Tune RandomForest với grid nhỏ và chọn threshold tốt nhất theo metric config.

    Returns:
        {
            "model": fitted_model,
            "threshold": best_threshold,
            "best_params": {...},
            "validation_accuracy": float,
            "threshold_metrics": {...},
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
        "max_depth": MODEL_CONFIG["max_depth"],
        "min_samples_leaf": MODEL_CONFIG["min_samples_leaf"],
        "max_features": MODEL_CONFIG.get("max_features", "sqrt"),
    }
    best_score = -1.0
    best_threshold_metrics: Dict[str, Any] = {
        "optimization_metric": THRESHOLD_OPTIMIZATION_METRIC,
        "validation_accuracy": -1.0,
        "validation_balanced_accuracy": -1.0,
        "validation_f1": -1.0,
        "score": -1.0,
    }

    for n_estimators in RF_TUNING_GRID["n_estimators"]:
        for min_samples_split in RF_TUNING_GRID["min_samples_split"]:
            for max_depth in RF_TUNING_GRID["max_depth"]:
                for min_samples_leaf in RF_TUNING_GRID["min_samples_leaf"]:
                    for max_features in RF_TUNING_GRID.get("max_features", ["sqrt"]):
                        candidate_params = {
                            "n_estimators": int(n_estimators),
                            "min_samples_split": int(min_samples_split),
                            "max_depth": int(max_depth) if max_depth else None,
                            "min_samples_leaf": int(min_samples_leaf),
                            "max_features": max_features
                            if isinstance(max_features, str)
                            else float(max_features),
                        }
                        model = create_model(candidate_params)
                        model.fit(train_df[predictors], train_df["Target"])
                        preds_proba = positive_class_probability(model, val_df[predictors])
                        selected = select_threshold_from_probabilities(
                            preds_proba,
                            val_df["Target"],
                            RF_THRESHOLD_GRID,
                            metric=THRESHOLD_OPTIMIZATION_METRIC,
                        )
                        oob = float(getattr(model, "oob_score_", 0.0))
                        # Main score follows validation metric; OOB only breaks close ties.
                        score = float(selected["score"]) + 0.01 * oob
                        if (
                            score > best_score
                            or (
                                score == best_score
                                and selected["accuracy"]
                                > best_threshold_metrics["validation_accuracy"]
                            )
                        ):
                            best_score = score
                            best_threshold = float(selected["threshold"])
                            best_model = model
                            best_params = candidate_params
                            best_threshold_metrics = {
                                "optimization_metric": selected["metric"],
                                "validation_accuracy": selected["accuracy"],
                                "validation_balanced_accuracy": selected[
                                    "balanced_accuracy"
                                ],
                                "validation_f1": selected["f1"],
                                "score": selected["score"],
                            }

    if best_model is None:
        raise ModelTrainingException("Failed to tune RandomForest model")

    return {
        "model": best_model,
        "threshold": best_threshold,
        "best_params": best_params,
        "validation_accuracy": best_threshold_metrics["validation_accuracy"],
        "validation_balanced_accuracy": best_threshold_metrics[
            "validation_balanced_accuracy"
        ],
        "validation_f1": best_threshold_metrics["validation_f1"],
        "threshold_metrics": best_threshold_metrics,
        "oob_score": float(getattr(best_model, "oob_score_", 0.0)),
    }
