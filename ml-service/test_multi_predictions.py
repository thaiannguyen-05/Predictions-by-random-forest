#!/usr/bin/env python3
"""
Test script for multi-hour predictions with confidence and predicted_price
"""
import json
import socket

def test_multi_hour_predictions(ticker="FPT"):
    """Test predictions for multiple hours"""
    host = "127.0.0.1"
    port = 9999
    
    try:
        # Create socket
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect((host, port))
        
        # Prepare request
        request = {
            "command": "predict_multi_hours",
            "ticker": ticker
        }
        
        # Send request
        print(f"Sending request: {json.dumps(request, indent=2)}")
        client.send(json.dumps(request).encode("utf-8"))
        client.shutdown(socket.SHUT_WR)
        
        # Receive response
        response_data = b""
        while True:
            chunk = client.recv(4096)
            if not chunk:
                break
            response_data += chunk
        
        client.close()
        
        # Parse response
        response = json.loads(response_data.decode("utf-8"))
        
        print("\n" + "="*60)
        print("RESPONSE:")
        print("="*60)
        print(json.dumps(response, indent=2, ensure_ascii=False))
        
        # Validate response structure
        if response.get("success"):
            print("\n" + "="*60)
            print("VALIDATION:")
            print("="*60)
            
            predictions = response.get("predictions", [])
            print(f"✓ Success: {response['success']}")
            print(f"✓ Ticker: {response.get('ticker')}")
            print(f"✓ Current Price: {response.get('current_price')}")
            print(f"✓ Number of predictions: {len(predictions)}")
            
            for i, pred in enumerate(predictions, 1):
                print(f"\nPrediction {i}:")
                print(f"  - Hour: {pred.get('hour')}")
                print(f"  - Predicted Price: {pred.get('predicted_price')}")
                print(f"  - Confidence: {pred.get('confidence')}")
                print(f"  - Prediction: {pred.get('prediction')}")
                print(f"  - Probability: {pred.get('probability')}")
                
                # Check required fields
                required_fields = ['hour', 'predicted_price', 'confidence']
                missing = [f for f in required_fields if f not in pred]
                if missing:
                    print(f"  ⚠ Missing fields: {missing}")
                else:
                    print(f"  ✓ All required fields present")
        else:
            print(f"\n❌ Error: {response.get('error')}")
            
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import sys
    ticker = sys.argv[1] if len(sys.argv) > 1 else "FPT"
    print(f"Testing multi-hour predictions for {ticker}...\n")
    test_multi_hour_predictions(ticker)
