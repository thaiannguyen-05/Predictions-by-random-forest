#!/usr/bin/env python3
import socket
import json

def send_command(host: str, port: int, command_dict: dict) -> dict:
    """Gửi command đến TCP server và nhận response"""
    try:
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect((host, port))
        
        command_json = json.dumps(command_dict)
        print(f"Sending: {command_json}")
        client_socket.send(command_json.encode('utf-8'))
        
        response = client_socket.recv(8192).decode('utf-8')
        client_socket.close()
        
        return json.loads(response)
    except Exception as e:
        return {"error": str(e)}

# Test train
print("=" * 60)
print("Test: TRAIN MODEL for FPT")
print("=" * 60)
response = send_command("localhost", 9999, {
    "command": "train_single",
    "ticker": "FPT",
    "test_size": 0.2,
    "n_estimators": 100
})
print(json.dumps(response, indent=2, ensure_ascii=False))
