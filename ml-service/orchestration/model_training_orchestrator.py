"""
Train orchestrator cho nhiều model với cùng pipeline feature như Random Forest hiện tại.
"""
import os
import pickle
import logging
from datetime import datetime, timedelta
from typing import Any, Callable, Dict, List, Optional, Tuple

from core.config import (
    FEATURE_THRESHOLD,
    MODELS_DIR,
    TICKERS,
    EVAL_MIN_FOLDS,
    EVAL_MAX_FOLDS,
    EVAL_MIN_TEST_SIZE,
    EVAL_MAX_TEST_SIZE,
    get_model_path,
    standardize_ticker,
)
from data_pipeline.data_loader import load_data
from data_pipeline.features import add_features
from modeling.random_forest_model import create_model as create_random_forest_model
from modeling.random_forest_model import select_features as select_random_forest_features
from modeling.random_forest_model import tune_model_with_validation
from modeling.hist_gradient_boosting_model import (
    create_model as create_hist_gradient_boosting_model,
)
from modeling.hist_gradient_boosting_model import (
    select_features as select_hist_gradient_boosting_features,
)
from modeling.decision_tree_model import create_model as create_decision_tree_model
from modeling.decision_tree_model import select_features as select_decision_tree_features
from modeling.bagging_model import create_model as create_bagging_model
from modeling.bagging_model import select_features as select_bagging_features

logger = logging.getLogger(__name__)

ModelFactory = Callable[[], Any]
FeatureSelector = Callable[[Any, List[str], float], Tuple[List[str], Any]]

MODEL_REGISTRY: Dict[str, Tuple[ModelFactory, FeatureSelector]] = {
    "random_forest": (create_random_forest_model, select_random_forest_features),
    "hist_gradient_boosting": (
        create_hist_gradient_boosting_model,
        select_hist_gradient_boosting_features,
    ),
    "decision_tree": (create_decision_tree_model, select_decision_tree_features),
    "bagging": (create_bagging_model, select_bagging_features),
}

SUPPORTED_MODEL_TYPES: List[str] = list(MODEL_REGISTRY.keys())


def _get_model_output_path(ticker: str, model_type: str) -> str:
    standardized = standardize_ticker(ticker)
    base_path = get_model_path(standardized)

    if model_type == "random_forest":
        return base_path

    if base_path.endswith("_model.pkl"):
        return base_path.replace("_model.pkl", f"_{model_type}_model.pkl")

    if base_path.endswith(".pkl"):
        return base_path.replace(".pkl", f"_{model_type}.pkl")

    return f"{base_path}_{model_type}"


def train_all_models_recent(
    recent_weeks: int,
    model_types: Optional[List[str]] = None,
    tickers: Optional[List[str]] = None,
) -> Dict[str, Any]:
    started_at = datetime.now()

    if recent_weeks not in (1, 2):
        return {
            "success": False,
            "error": "recent_weeks must be either 1 or 2",
            "started_at": started_at.isoformat(),
            "finished_at": datetime.now().isoformat(),
        }

    if model_types is not None and not isinstance(model_types, list):
        return {
            "success": False,
            "error": "model_types must be a list when provided",
            "supported_model_types": SUPPORTED_MODEL_TYPES,
            "started_at": started_at.isoformat(),
            "finished_at": datetime.now().isoformat(),
        }

    if tickers is not None and not isinstance(tickers, list):
        return {
            "success": False,
            "error": "tickers must be a list when provided",
            "started_at": started_at.isoformat(),
            "finished_at": datetime.now().isoformat(),
        }

    requested_models = model_types or SUPPORTED_MODEL_TYPES
    normalized_models = [m.strip().lower() for m in requested_models]
    invalid_models = [m for m in normalized_models if m not in MODEL_REGISTRY]
    if invalid_models:
        return {
            "success": False,
            "error": f"Unsupported model types: {invalid_models}",
            "supported_model_types": SUPPORTED_MODEL_TYPES,
            "started_at": started_at.isoformat(),
            "finished_at": datetime.now().isoformat(),
        }

    standardized_tickers = [standardize_ticker(str(t)) for t in (tickers or TICKERS)]
    os.makedirs(MODELS_DIR, exist_ok=True)

    results: List[Dict[str, Any]] = []
    trained_jobs = 0
    failed_jobs = 0

    for ticker in standardized_tickers:
        ticker_result: Dict[str, Any] = {
            "ticker": ticker,
            "models": [],
        }

        try:
            raw_df = load_data(ticker)
            featured_df, predictors = add_features(raw_df)

            if featured_df.empty:
                raise ValueError("No data after feature engineering")

            end_time = featured_df.index.max()
            start_time = end_time - timedelta(days=7 * recent_weeks)
            train_df = featured_df[featured_df.index >= start_time].copy()

            if len(train_df) < 2:
                raise ValueError(
                    f"Insufficient rows in last {recent_weeks} week(s): {len(train_df)}"
                )

            for model_type in normalized_models:
                create_model_fn, select_features_fn = MODEL_REGISTRY[model_type]

                model_summary: Dict[str, Any] = {"model_type": model_type}
                try:
                    selected_predictors, _ = select_features_fn(
                        train_df, predictors, threshold=FEATURE_THRESHOLD
                    )
                    if not selected_predictors:
                        selected_predictors = predictors

                    model = create_model_fn()
                    model.fit(train_df[selected_predictors], train_df["Target"])

                    model_file = _get_model_output_path(ticker, model_type)
                    model_data = {
                        "model": model,
                        "selected_predictors": selected_predictors,
                        "ticker": ticker,
                        "model_type": model_type,
                        "recent_weeks": recent_weeks,
                    }
                    with open(model_file, "wb") as model_output:
                        pickle.dump(model_data, model_output)

                    model_summary.update(
                        {
                            "success": True,
                            "features_count": len(selected_predictors),
                            "training_rows": len(train_df),
                            "model_file": model_file,
                        }
                    )
                    trained_jobs += 1
                except Exception as model_error:
                    model_summary.update(
                        {
                            "success": False,
                            "error": str(model_error),
                            "training_rows": len(train_df),
                        }
                    )
                    failed_jobs += 1

                ticker_result["models"].append(model_summary)

        except Exception as ticker_error:
            for model_type in normalized_models:
                ticker_result["models"].append(
                    {
                        "model_type": model_type,
                        "success": False,
                        "error": str(ticker_error),
                    }
                )
                failed_jobs += 1

        results.append(ticker_result)

    total_jobs = len(standardized_tickers) * len(normalized_models)
    success = trained_jobs > 0 and failed_jobs == 0
    if trained_jobs > 0 and failed_jobs > 0:
        success = True

    finished_at = datetime.now()
    duration_seconds = round((finished_at - started_at).total_seconds(), 3)

    model_summary: Dict[str, Dict[str, int]] = {}
    for model_type in normalized_models:
        model_summary[model_type] = {
            "trained_jobs": 0,
            "failed_jobs": 0,
        }

    for ticker_result in results:
        for model_result in ticker_result.get("models", []):
            model_type = model_result.get("model_type")
            if model_type not in model_summary:
                continue
            if model_result.get("success"):
                model_summary[model_type]["trained_jobs"] += 1
            else:
                model_summary[model_type]["failed_jobs"] += 1

    return {
        "success": success,
        "status": (
            "completed"
            if failed_jobs == 0
            else ("completed_with_errors" if trained_jobs > 0 else "failed")
        ),
        "started_at": started_at.isoformat(),
        "finished_at": finished_at.isoformat(),
        "duration_seconds": duration_seconds,
        "recent_weeks": recent_weeks,
        "model_types": normalized_models,
        "supported_model_types": SUPPORTED_MODEL_TYPES,
        "tickers_total": len(standardized_tickers),
        "total_jobs": total_jobs,
        "trained_jobs": trained_jobs,
        "failed_jobs": failed_jobs,
        "success_rate": round((trained_jobs / total_jobs) * 100, 2)
        if total_jobs
        else 0.0,
        "model_summary": model_summary,
        "results": results,
    }


def evaluate_models(ticker: str, recent_days: int = 365) -> Dict[str, Any]:
    """
    Evaluates all models with walk-forward folds and computes classification
    + pseudo-regression metrics.
    """
    import numpy as np
    from sklearn.metrics import accuracy_score, f1_score, r2_score

    def _positive_class_proba(predicted_proba, classes_) -> np.ndarray:
        if predicted_proba.ndim != 2:
            return np.zeros(predicted_proba.shape[0], dtype=float)

        if predicted_proba.shape[1] == 1:
            only_class = int(classes_[0]) if classes_ is not None and len(classes_) > 0 else 0
            return predicted_proba[:, 0] if only_class == 1 else np.zeros(predicted_proba.shape[0], dtype=float)

        if classes_ is None:
            return predicted_proba[:, 1]

        class_to_idx = {int(c): idx for idx, c in enumerate(classes_)}
        positive_idx = class_to_idx.get(1)
        if positive_idx is None:
            return np.zeros(predicted_proba.shape[0], dtype=float)

        return predicted_proba[:, positive_idx]

    started_at = datetime.now()
    standardized_ticker = standardize_ticker(ticker)

    try:
        raw_df = load_data(standardized_ticker)
        featured_df, predictors = add_features(raw_df)

        if featured_df.empty or len(featured_df) < 50:
            raise ValueError(f"Not enough data to evaluate models for {ticker}")

        if recent_days <= 0:
            raise ValueError("recent_days must be greater than 0")

        window_end = featured_df.index.max()
        window_start = window_end - timedelta(days=recent_days)
        window_df = featured_df[featured_df.index >= window_start].copy()

        min_rows_required = 5
        if len(window_df) < min_rows_required:
            raise ValueError(
                f"Not enough data in last {recent_days} days for {standardized_ticker}"
            )

        total_rows = len(window_df)
        adaptive_test_size = max(2, int(total_rows * 0.2))
        test_size = min(EVAL_MAX_TEST_SIZE, adaptive_test_size)
        test_size = min(test_size, max(2, total_rows // 2))

        if total_rows <= test_size + 2:
            raise ValueError(
                f"Insufficient rows to build walk-forward folds for {standardized_ticker}"
            )

        max_possible_folds = max(1, total_rows // test_size - 1)
        folds = min(EVAL_MAX_FOLDS, max_possible_folds)

        model_metrics: Dict[str, Dict[str, Any]] = {
            model_type: {
                "accuracies": [],
                "maes": [],
                "rmses": [],
                "mapes": [],
                "f1s": [],
                "r2s": [],
                "test_rows": 0,
                "folds": 0,
                "features_counts": [],
                "rf_tuning": None,
                "evaluation_modes": [],
            }
            for model_type in MODEL_REGISTRY.keys()
        }

        fold_boundaries = []
        for fold_idx in range(folds):
            test_end = total_rows - (folds - fold_idx - 1) * test_size
            test_start = max(test_size + 1, test_end - test_size)

            train_df = window_df.iloc[:test_start].copy()
            test_df = window_df.iloc[test_start:test_end].copy()

            if train_df.empty or test_df.empty:
                continue

            fold_boundaries.append(
                {
                    "fold": fold_idx + 1,
                    "train_rows": len(train_df),
                    "test_rows": len(test_df),
                }
            )

            volatility = train_df["Close"].pct_change().std()
            if not np.isfinite(volatility) or volatility == 0:
                volatility = 0.01

            val_size = max(5, min(test_size, int(len(train_df) * 0.2)))
            tuning_train_df = train_df.iloc[:-val_size] if len(train_df) > val_size else train_df
            tuning_val_df = train_df.iloc[-val_size:] if len(train_df) > val_size else test_df

            for model_type, (create_model_fn, select_features_fn) in MODEL_REGISTRY.items():
                try:
                    selected_predictors, _ = select_features_fn(
                        train_df, predictors, threshold=FEATURE_THRESHOLD
                    )
                    if not selected_predictors:
                        selected_predictors = predictors

                    threshold = 0.5
                    tuning_meta = None
                    evaluation_mode = "walk_forward_retrain"

                    if model_type == "random_forest":
                        tuned = tune_model_with_validation(
                            tuning_train_df,
                            tuning_val_df,
                            selected_predictors,
                        )
                        model = tuned["model"]
                        threshold = float(tuned["threshold"])
                        tuning_meta = {
                            "best_params": tuned["best_params"],
                            "best_threshold": threshold,
                            "validation_accuracy": float(tuned["validation_accuracy"]),
                        }
                    else:
                        model = create_model_fn()
                        model.fit(train_df[selected_predictors], train_df["Target"])

                    predicted_proba = model.predict_proba(test_df[selected_predictors])
                    preds_proba = _positive_class_proba(predicted_proba, getattr(model, "classes_", None))
                    preds = (preds_proba >= threshold).astype(int)
                    accuracy = float(accuracy_score(test_df["Target"], preds))
                    f1 = float(f1_score(test_df["Target"], preds, zero_division=0))

                    actual_prices = test_df["Close"].values
                    prev_prices = test_df["Open"].values
                    predicted_prices = []

                    for i, prob in enumerate(preds_proba):
                        prediction_val = int(prob >= threshold)
                        direction = 1 if prediction_val == 1 else -1
                        confidence = max(prob, 1 - prob)
                        price_change_factor = direction * confidence * volatility * 2.0
                        pred_pr = prev_prices[i] * (1 + price_change_factor)
                        predicted_prices.append(pred_pr)

                    predicted_prices = np.array(predicted_prices)
                    errors = predicted_prices - actual_prices

                    mae = float(np.mean(np.abs(errors)))
                    rmse = float(np.sqrt(np.mean(errors ** 2)))
                    mape = float(np.mean(np.abs(errors / actual_prices)))

                    try:
                        r2 = float(r2_score(actual_prices, predicted_prices))
                        if not np.isfinite(r2):
                            r2 = 0.0
                    except Exception:
                        r2 = 0.0

                    model_metrics[model_type]["accuracies"].append(accuracy)
                    model_metrics[model_type]["maes"].append(mae)
                    model_metrics[model_type]["rmses"].append(rmse)
                    model_metrics[model_type]["mapes"].append(mape)
                    model_metrics[model_type]["f1s"].append(f1)
                    model_metrics[model_type]["r2s"].append(r2)
                    model_metrics[model_type]["test_rows"] += len(test_df)
                    model_metrics[model_type]["folds"] += 1
                    model_metrics[model_type]["features_counts"].append(len(selected_predictors))
                    model_metrics[model_type]["evaluation_modes"].append(evaluation_mode)

                    if model_type == "random_forest" and tuning_meta is not None:
                        model_metrics[model_type]["rf_tuning"] = tuning_meta
                except Exception as model_error:
                    logger.warning(
                        f"Skip model {model_type} at fold {fold_idx + 1} for {standardized_ticker}: {model_error}"
                    )
                    continue

        results = []
        for model_type, metrics in model_metrics.items():
            if not metrics["accuracies"]:
                continue

            current_time = window_df.index[-1]
            prediction_time = current_time + timedelta(days=1)
            accuracy_mean = float(np.mean(metrics["accuracies"]))
            accuracy_std = float(np.std(metrics["accuracies"]))

            result_row = {
                "name": model_type,
                "accuracy": accuracy_mean,
                "accuracyStd": accuracy_std,
                "mae": float(np.mean(metrics["maes"])),
                "rmse": float(np.mean(metrics["rmses"])),
                "mape": float(np.mean(metrics["mapes"])),
                "f1": float(np.mean(metrics["f1s"])),
                "r2": float(np.mean(metrics["r2s"])),
                "predictionDate": prediction_time.isoformat(),
                "folds": int(metrics["folds"]),
                "oosSamples": int(metrics["test_rows"]),
                "featuresCountMean": float(np.mean(metrics["features_counts"])),
            }

            if model_type == "random_forest":
                distinct_modes = sorted(set(metrics["evaluation_modes"]))
                result_row["evaluationMode"] = (
                    distinct_modes[0] if len(distinct_modes) == 1 else "mixed"
                )
                result_row["evaluationModes"] = distinct_modes

                if metrics["rf_tuning"]:
                    result_row["rfTuning"] = metrics["rf_tuning"]

            results.append(result_row)

        return {
            "success": True,
            "ticker": standardized_ticker,
            "recent_days": recent_days,
            "window_start": window_start.isoformat(),
            "window_end": window_end.isoformat(),
            "rows": total_rows,
            "evaluation": {
                "protocol": "walk_forward",
                "folds": len(fold_boundaries),
                "test_size": test_size,
                "fold_boundaries": fold_boundaries,
            },
            "results": results,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        logger.error(f"Error evaluating models for {ticker}: {e}")
        return {"success": False, "error": str(e)}
