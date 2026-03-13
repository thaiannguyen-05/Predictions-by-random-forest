"""
Train orchestrator cho nhiều model với cùng pipeline feature như Random Forest hiện tại.
"""
import os
import pickle
import logging
from datetime import timedelta
from typing import Any, Callable, Dict, List, Optional, Tuple

from config import FEATURE_THRESHOLD, MODELS_DIR, TICKERS, get_model_path, standardize_ticker
from data_loader import load_data
from features import add_features
from model import create_model as create_random_forest_model
from model import select_features as select_random_forest_features
from extra_trees_model import create_model as create_extra_trees_model
from extra_trees_model import select_features as select_extra_trees_features
from decision_tree_model import create_model as create_decision_tree_model
from decision_tree_model import select_features as select_decision_tree_features
from bagging_model import create_model as create_bagging_model
from bagging_model import select_features as select_bagging_features

logger = logging.getLogger(__name__)

ModelFactory = Callable[[], Any]
FeatureSelector = Callable[[Any, List[str], float], Tuple[List[str], Any]]

MODEL_REGISTRY: Dict[str, Tuple[ModelFactory, FeatureSelector]] = {
    "random_forest": (create_random_forest_model, select_random_forest_features),
    "extra_trees": (create_extra_trees_model, select_extra_trees_features),
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
    if recent_weeks not in (1, 2):
        return {
            "success": False,
            "error": "recent_weeks must be either 1 or 2",
        }

    if model_types is not None and not isinstance(model_types, list):
        return {
            "success": False,
            "error": "model_types must be a list when provided",
            "supported_model_types": SUPPORTED_MODEL_TYPES,
        }

    if tickers is not None and not isinstance(tickers, list):
        return {
            "success": False,
            "error": "tickers must be a list when provided",
        }

    requested_models = model_types or SUPPORTED_MODEL_TYPES
    normalized_models = [m.strip().lower() for m in requested_models]
    invalid_models = [m for m in normalized_models if m not in MODEL_REGISTRY]
    if invalid_models:
        return {
            "success": False,
            "error": f"Unsupported model types: {invalid_models}",
            "supported_model_types": SUPPORTED_MODEL_TYPES,
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

    return {
        "success": success,
        "recent_weeks": recent_weeks,
        "model_types": normalized_models,
        "tickers_total": len(standardized_tickers),
        "total_jobs": total_jobs,
        "trained_jobs": trained_jobs,
        "failed_jobs": failed_jobs,
        "results": results,
    }
