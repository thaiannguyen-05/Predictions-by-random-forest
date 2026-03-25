"""
Model module cho ML Service.
Xử lý việc train model Hist Gradient Boosting với cùng pipeline feature.
"""
from sklearn.ensemble import HistGradientBoostingClassifier

from core.config import MODEL_CONFIG
from modeling.random_forest_model import select_features as select_features


def create_model() -> HistGradientBoostingClassifier:
    return HistGradientBoostingClassifier(
        max_iter=200,
        learning_rate=0.05,
        min_samples_leaf=MODEL_CONFIG["min_samples_split"],
        random_state=MODEL_CONFIG["random_state"],
    )
