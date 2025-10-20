#!/usr/bin/env python3
import socket
import json

def send_command(host: str, port: int, command_dict: dict) -> dict:
    """Gửi command đến TCP server và nhận response"""
    try:
        # Tạo socket connection
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client_socket.connect((host, port))
        
        # Gửi command
        command_json = json.dumps(command_dict)
        client_socket.send(command_json.encode('utf-8'))
        
        # Nhận response
        response = client_socket.recv(4096).decode('utf-8')
        client_socket.close()
        
        return json.loads(response)
    except Exception as e:
        return {"error": str(e)}

# Test 1: Ping
print("=" * 60)
print("Test 1: PING")
print("=" * 60)
response = send_command("localhost", 9999, {"command": "ping"})
print(json.dumps(response, indent=2, ensure_ascii=False))

# Test 2: Get current price
print("\n" + "=" * 60)
print("Test 2: GET CURRENT PRICE")
print("=" * 60)
response = send_command("localhost", 9999, {
    "command": "get_current_price",
    "ticker": "FPT"
})
print(json.dumps(response, indent=2, ensure_ascii=False))
print(f"\nPrice value: {response.get('price')}")
print(f"Price type: {type(response.get('price'))}")
