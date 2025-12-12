import socket
import json
import threading
import logging
from datetime import datetime
from typing import Dict, Any, Optional
import signal
import sys

from real_time_prediction import RealTimePrediction
from config import (
    SERVER_HOST,
    SERVER_PORT,
    SOCKET_BUFFER_SIZE,
    MAX_CONNECTIONS,
    standardize_ticker,
    get_csv_path,
    get_model_path,
)

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


class StockPredictionTCPServer:
    """TCP Server cho Stock Prediction Service."""
    
    def __init__(self, host: str = SERVER_HOST, port: int = SERVER_PORT):
        """
        Khởi tạo TCP Server.
        
        Args:
            host: Host address
            port: Port number
        """
        self.host = host
        self.port = port
        self.socket: Optional[socket.socket] = None
        self.prediction_instances: Dict[str, RealTimePrediction] = {}
        self.running = False

    def get_prediction_instance(self, ticker: str) -> RealTimePrediction:
        """
        Get or create prediction instance for a ticker.
        
        Args:
            ticker: Mã cổ phiếu
            
        Returns:
            RealTimePrediction instance
        """
        standardized = standardize_ticker(ticker)
        
        if standardized not in self.prediction_instances:
            self.prediction_instances[standardized] = RealTimePrediction(
                ticker=standardized,
                csv_file=get_csv_path(standardized),
                model_file=get_model_path(standardized),
            )
        
        return self.prediction_instances[standardized]

    def handle_get_current_price(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho lệnh lấy giá hiện tại"""
        try:
            ticker = data.get("ticker")
            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            # Standardize ticker
            ticker = standardize_ticker(ticker)

            # Create a temporary instance to get the price
            predictor = RealTimePrediction(ticker=ticker)
            current_info = predictor.get_current_price()

            if current_info is None:
                return {
                    "success": False,
                    "error": f"Cannot get current price for {ticker}",
                }

            return {
                "success": True,
                "ticker": ticker,
                "price": current_info["price"],
                "time": current_info["time"].isoformat(),
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error getting current price: {e}")
            return {"success": False, "error": str(e)}

    def handle_get_financial_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho lệnh lấy dữ liệu tài chính"""
        try:
            ticker = data.get("ticker")
            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            # Standardize ticker
            ticker = standardize_ticker(ticker)

            # Create a temporary instance to get financial data
            predictor = RealTimePrediction(ticker=ticker)
            financial_data = predictor.get_financial_data()

            if financial_data is None:
                return {
                    "success": False,
                    "error": f"Cannot get financial data for {ticker}",
                }

            return {
                "success": True,
                "data": financial_data,
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error getting financial data: {e}")
            return {"success": False, "error": str(e)}

    def handle_predict(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho lệnh dự đoán"""
        try:
            ticker = data.get("ticker")
            hours_ahead = data.get("hours_ahead", 1)

            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            predictor = self.get_prediction_instance(ticker)

            # Load model if not trained
            if not predictor.is_trained:
                if not predictor.load_model():
                    # Try to train if no model exists
                    train_success = predictor.train_model()
                    if not train_success:
                        return {
                            "success": False,
                            "error": f"Model for {ticker} is not trained and training failed",
                        }

            # Make prediction
            result = predictor.predict_next_hours(hours_ahead)

            if result is None:
                return {"success": False, "error": "Failed to make prediction"}

            return {
                "success": True,
                "ticker": ticker,
                "current_price": result["current_price"],
                "current_time": (
                    result["current_time"].isoformat()
                    if result["current_time"]
                    else None
                ),
                "prediction_time": result["prediction_time"].isoformat(),
                "prediction": result["prediction"],
                "probability": result["probability"],
                "confidence": result["confidence"],
                "hours_ahead": result["hours_ahead"],
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error making prediction: {e}")
            return {"success": False, "error": str(e)}

    def handle_predict_multi_hours(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho dự đoán nhiều khung thời gian (1,2,3,4 giờ)"""
        try:
            ticker = data.get("ticker")
            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            predictor = self.get_prediction_instance(ticker)

            # Load model if not trained
            if not predictor.is_trained:
                if not predictor.load_model():
                    # Try to train if no model exists
                    train_success = predictor.train_model()
                    if not train_success:
                        return {
                            "success": False,
                            "error": f"Model for {ticker} is not trained and training failed",
                        }

            # Make predictions for 1, 2, 3, 4 hours
            predictions = []
            current_price = None
            current_time = None

            for hours in [1, 2, 3, 4]:
                result = predictor.predict_next_hours(hours)
                if result:
                    # Store current price and time from first prediction
                    if current_price is None:
                        current_price = result["current_price"]
                        current_time = result["current_time"]

                    predictions.append(
                        {
                            "hour": hours,
                            "hours_ahead": hours,
                            "predicted_price": result.get("predicted_price"),
                            "prediction": result["prediction"],
                            "probability": result["probability"],
                            "confidence": result["confidence"],
                            "prediction_time": result["prediction_time"].isoformat(),
                        }
                    )

            if not predictions:
                return {"success": False, "error": "Failed to make predictions"}

            return {
                "success": True,
                "ticker": ticker,
                "current_price": current_price,
                "current_time": current_time.isoformat() if current_time else None,
                "predictions": predictions,
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error making multi-hour predictions: {e}")
            return {"success": False, "error": str(e)}

    def handle_train_model(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho lệnh train model"""
        try:
            ticker = data.get("ticker")
            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            predictor = self.get_prediction_instance(ticker)

            # Try to load existing model first
            if predictor.load_model():
                return {
                    "success": True,
                    "message": f"Model for {ticker} loaded successfully",
                    "ticker": ticker,
                    "features_count": (
                        len(predictor.selected_predictors)
                        if predictor.selected_predictors
                        else 0
                    ),
                    "timestamp": datetime.now().isoformat(),
                }

            # Train new model
            success = predictor.train_model()
            if not success:
                return {"success": False, "error": "Failed to train model"}

            return {
                "success": True,
                "message": f"Model for {ticker} trained successfully",
                "ticker": ticker,
                "features_count": (
                    len(predictor.selected_predictors)
                    if predictor.selected_predictors
                    else 0
                ),
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error training model: {e}")
            return {"success": False, "error": str(e)}

    def handle_prediction_report(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho lệnh lấy báo cáo dự đoán nhiều khung thời gian"""
        try:
            ticker = data.get("ticker")
            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            predictor = self.get_prediction_instance(ticker)

            # Load model if not trained
            if not predictor.is_trained:
                if not predictor.load_model():
                    return {
                        "success": False,
                        "error": f"Model for {ticker} is not trained",
                    }

            report = predictor.get_prediction_report()

            if not report:
                return {
                    "success": False,
                    "error": "Failed to generate prediction report",
                }

            # Convert datetime objects to ISO format
            for pred in report:
                if pred.get("current_time"):
                    pred["current_time"] = pred["current_time"].isoformat()
                if pred.get("prediction_time"):
                    pred["prediction_time"] = pred["prediction_time"].isoformat()

            return {
                "success": True,
                "ticker": ticker,
                "predictions": report,
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error generating prediction report: {e}")
            return {"success": False, "error": str(e)}

    def handle_update_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handler cho lệnh cập nhật dữ liệu"""
        try:
            ticker = data.get("ticker")
            if not ticker:
                return {"success": False, "error": "Missing ticker parameter"}

            predictor = self.get_prediction_instance(ticker)
            success = predictor.update_data()

            if not success:
                return {"success": False, "error": "Failed to update data"}

            return {
                "success": True,
                "message": f"Data for {ticker} updated successfully",
                "ticker": ticker,
                "timestamp": datetime.now().isoformat(),
            }

        except Exception as e:
            logger.error(f"Error updating data: {e}")
            return {"success": False, "error": str(e)}

    def handle_client_request(self, client_socket, client_address):
        """Handle incoming client requests"""
        logger.info(f"New connection from {client_address}")

        try:
            # Receive data
            data = client_socket.recv(4096).decode("utf-8")
            if not data:
                return

            logger.info(f"Received from {client_address}: {data[:100]}...")

            try:
                # Parse JSON request
                request = json.loads(data)
                command = request.get("command")

                # Route to appropriate handler
                if command == "get_current_price":
                    response = self.handle_get_current_price(request)
                elif command == "get_financial_data":
                    response = self.handle_get_financial_data(request)
                elif command == "predict":
                    response = self.handle_predict(request)
                elif command == "predict_multi_hours":
                    response = self.handle_predict_multi_hours(request)
                elif command == "train" or command == "train_single":
                    response = self.handle_train_model(request)
                elif command == "prediction_report":
                    response = self.handle_prediction_report(request)
                elif command == "update_data":
                    response = self.handle_update_data(request)
                elif command == "ping":
                    response = {
                        "success": True,
                        "message": "pong",
                        "timestamp": datetime.now().isoformat(),
                    }
                else:
                    response = {
                        "success": False,
                        "error": f"Unknown command: {command}",
                    }

                # Send response
                response_json = json.dumps(
                    response, ensure_ascii=False, default=str
                )
                client_socket.send(response_json.encode("utf-8"))

                logger.info(
                    f"Sent to {client_address}: {command} -> {response.get('success', 'N/A')}"
                )

            except json.JSONDecodeError:
                error_response = {"success": False, "error": "Invalid JSON format"}
                client_socket.send(json.dumps(error_response).encode("utf-8"))

        except Exception as e:
            logger.error(f"Error handling client {client_address}: {e}")
        finally:
            client_socket.close()
            logger.info(f"Connection with {client_address} closed")

    def start_server(self):
        """Start the TCP server"""
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            self.socket.bind((self.host, self.port))
            self.socket.listen(5)
            self.running = True

            logger.info(
                f"Stock Prediction TCP Server started on {self.host}:{self.port}"
            )
            logger.info("Waiting for connections...")

            while self.running:
                try:
                    client_socket, client_address = self.socket.accept()
                    client_thread = threading.Thread(
                        target=self.handle_client_request,
                        args=(client_socket, client_address),
                    )
                    client_thread.daemon = True
                    client_thread.start()
                except OSError:
                    if self.running:
                        logger.error("Socket error occurred")
                    break

        except Exception as e:
            logger.error(f"Server error: {e}")
        finally:
            self.stop_server()

    def stop_server(self):
        """Stop the TCP server"""
        logger.info("Stopping server...")
        self.running = False
        if self.socket:
            self.socket.close()
        logger.info("Server stopped")


def signal_handler(signum, frame):
    """Handle shutdown signals"""
    logger.info("Received shutdown signal")
    if "server" in globals():
        server.stop_server()


if __name__ == "__main__":
    # Create and start server
    global server
    server = StockPredictionTCPServer(host="0.0.0.0", port=9999)

    # Setup signal handlers
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    try:
        server.start_server()
    except KeyboardInterrupt:
        logger.info("Server interrupted by user")
    except Exception as e:
        logger.error(f"Server failed to start: {e}")
    finally:
        server.stop_server()
