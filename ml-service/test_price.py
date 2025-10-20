#!/usr/bin/env python3
import yfinance as yf
import pandas as pd

ticker = "FPT.VN"
print(f"Testing ticker: {ticker}")
print("=" * 60)

# Test 1: Lấy data 1 ngày với interval 1 phút
print("\n1. Data interval 1m (period=1d):")
ticker_obj = yf.Ticker(ticker)
data_1m = ticker_obj.history(period="1d", interval="1m")
print(f"   Rows: {len(data_1m)}")
print(f"   Empty: {data_1m.empty}")
if not data_1m.empty:
    print(f"   Last Close: {data_1m['Close'].iloc[-1]}")
    print(f"   Last Time: {data_1m.index[-1]}")
    print("\n   Last 3 rows:")
    print(data_1m.tail(3))

# Test 2: Lấy data 5 ngày
print("\n2. Data period=5d:")
data_5d = ticker_obj.history(period="5d")
print(f"   Rows: {len(data_5d)}")
print(f"   Empty: {data_5d.empty}")
if not data_5d.empty:
    print(f"   Last Close: {data_5d['Close'].iloc[-1]}")
    print(f"   Last Time: {data_5d.index[-1]}")
    print("\n   Last 3 rows:")
    print(data_5d[['Open', 'High', 'Low', 'Close', 'Volume']].tail(3))

# Test 3: Thông tin ticker
print("\n3. Ticker Info:")
try:
    info = ticker_obj.info
    if 'currentPrice' in info:
        print(f"   Current Price: {info.get('currentPrice', 'N/A')}")
    if 'regularMarketPrice' in info:
        print(f"   Regular Market Price: {info.get('regularMarketPrice', 'N/A')}")
    if 'previousClose' in info:
        print(f"   Previous Close: {info.get('previousClose', 'N/A')}")
except Exception as e:
    print(f"   Error: {e}")
