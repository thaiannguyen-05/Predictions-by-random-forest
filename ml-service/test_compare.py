from model_training_orchestrator import evaluate_models
import json
import traceback

try:
    print("Evaluating FPT.VN...")
    result = evaluate_models("FPT.VN")
    print(json.dumps(result, indent=2))
except Exception as e:
    print("Error:", e)
    traceback.print_exc()
