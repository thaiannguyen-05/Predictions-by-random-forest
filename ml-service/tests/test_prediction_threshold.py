import os
import pickle
import sys
import tempfile
import unittest
from datetime import datetime
from pathlib import Path
from unittest.mock import patch

import numpy as np
import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from core.config import DATA_START_DATE
from modeling.random_forest_model import (
    create_model,
    is_tuned_model_artifact_ready,
    select_threshold_from_probabilities,
    tune_model_with_validation,
)
from services.real_time_prediction import RealTimePrediction


class FixedProbabilityModel:
    def predict_proba(self, _features):
        return np.array([[0.45, 0.55]])


class PredictionThresholdTest(unittest.TestCase):
    def test_threshold_selection_uses_balanced_accuracy_not_raw_accuracy(self):
        probabilities = pd.Series([0.10, 0.20, 0.30, 0.45, 0.55])
        targets = pd.Series([0, 0, 0, 1, 1])
        thresholds = [0.35, 0.60]

        result = select_threshold_from_probabilities(
            probabilities,
            targets,
            thresholds,
            metric="balanced_accuracy",
        )

        self.assertEqual(result["threshold"], 0.35)
        self.assertAlmostEqual(result["balanced_accuracy"], 1.0)

    def test_random_forest_uses_bootstrap_and_tuning_reports_threshold_metrics(self):
        model = create_model()
        self.assertTrue(model.get_params()["bootstrap"])
        self.assertTrue(model.get_params()["oob_score"])
        self.assertEqual(model.get_params()["n_jobs"], -1)

        train_df = pd.DataFrame(
            {
                "feature_a": np.r_[np.linspace(0, 0.4, 20), np.linspace(0.6, 1.0, 20)],
                "feature_b": np.r_[np.linspace(1.0, 0.6, 20), np.linspace(0.4, 0.0, 20)],
                "Target": [0] * 20 + [1] * 20,
            }
        )
        val_df = pd.DataFrame(
            {
                "feature_a": [0.05, 0.15, 0.75, 0.95],
                "feature_b": [0.95, 0.85, 0.25, 0.05],
                "Target": [0, 0, 1, 1],
            }
        )

        with (
            patch(
                "modeling.random_forest_model.RF_TUNING_GRID",
                {
                    "n_estimators": [20],
                    "min_samples_split": [2],
                    "max_depth": [3],
                    "min_samples_leaf": [1],
                    "max_features": ["sqrt"],
                },
            ),
            patch("modeling.random_forest_model.RF_THRESHOLD_GRID", [0.35, 0.5]),
        ):
            result = tune_model_with_validation(
                train_df,
                val_df,
                ["feature_a", "feature_b"],
            )

        self.assertIn("best_params", result)
        self.assertIn("oob_score", result)
        self.assertIn("threshold_metrics", result)
        self.assertEqual(result["threshold_metrics"]["optimization_metric"], "balanced_accuracy")
        self.assertIn("validation_balanced_accuracy", result["threshold_metrics"])
        self.assertIn("validation_f1", result["threshold_metrics"])

    def test_tuned_artifact_ready_requires_training_metadata(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            model_file = Path(tmp_dir) / "FPT_VN_model.pkl"
            with model_file.open("wb") as output:
                pickle.dump(
                    {
                        "model": FixedProbabilityModel(),
                        "selected_predictors": ["feature_a"],
                        "ticker": "FPT.VN",
                        "threshold": 0.60,
                    },
                    output,
                )

            self.assertFalse(is_tuned_model_artifact_ready(str(model_file), "FPT.VN"))

            with model_file.open("wb") as output:
                pickle.dump(
                    {
                        "model": FixedProbabilityModel(),
                        "selected_predictors": ["feature_a"],
                        "ticker": "FPT.VN",
                        "threshold": 0.60,
                        "best_params": {"n_estimators": 20},
                        "feature_importances": {"feature_a": 1.0},
                        "oob_score": 0.55,
                        "data_start_date": DATA_START_DATE,
                    },
                    output,
                )

            self.assertTrue(is_tuned_model_artifact_ready(str(model_file), "FPT.VN"))

    def test_predict_uses_saved_threshold_instead_of_default_half(self):
        with tempfile.TemporaryDirectory() as tmp_dir:
            model_file = Path(tmp_dir) / "FPT_VN_model.pkl"
            with model_file.open("wb") as output:
                pickle.dump(
                    {
                        "model": FixedProbabilityModel(),
                        "selected_predictors": ["feature_a"],
                        "ticker": "FPT.VN",
                        "threshold": 0.60,
                    },
                    output,
                )

            predictor = RealTimePrediction(
                ticker="FPT.VN",
                csv_file=str(Path(tmp_dir) / "FPT_VN_stock_data.csv"),
                model_file=str(model_file),
            )
            self.assertTrue(predictor.load_model())

            featured_df = pd.DataFrame(
                {
                    "feature_a": [1.0, 2.0],
                    "Close": [100.0, 101.0],
                }
            )

            with (
                patch.object(predictor, "update_data", return_value=True),
                patch.object(
                    predictor,
                    "get_current_price",
                    return_value={
                        "price": 100.0,
                        "time": datetime(2026, 5, 10, 10, 0, 0),
                    },
                ),
                patch("services.real_time_prediction.load_data", return_value=pd.DataFrame()),
                patch(
                    "services.real_time_prediction.add_features",
                    return_value=(featured_df, ["feature_a"]),
                ),
            ):
                result = predictor.predict_next_hours(hours_ahead=24)

            self.assertIsNotNone(result)
            self.assertEqual(result["prediction"], "GIẢM")
            self.assertEqual(result["threshold"], 0.60)


if __name__ == "__main__":
    unittest.main()
