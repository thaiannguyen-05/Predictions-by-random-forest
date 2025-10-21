import os
import yfinance as yf
import pandas as pd

# Danh sách 40 mã cổ phiếu VN30 và các mã phổ biến
TICKERS = [
    "FPT.VN", "VNM.VN", "VCB.VN", "VHM.VN", "VIC.VN",
    "HPG.VN", "TCB.VN", "VPB.VN", "MSN.VN", "MWG.VN",
    "GAS.VN", "PLX.VN", "SAB.VN", "BID.VN", "CTG.VN",
    "POW.VN", "VRE.VN", "SSI.VN", "HDB.VN", "MBB.VN",
    "STB.VN", "VJC.VN", "GVR.VN", "PDR.VN", "VCG.VN",
    "ACB.VN", "TPB.VN", "KDH.VN", "NVL.VN", "VCI.VN",
    "BCM.VN", "DPM.VN", "DGC.VN", "HNG.VN", "PNJ.VN",
    "REE.VN", "SBT.VN", "VGC.VN", "VHC.VN", "VNM.VN"
]

# ========================
# Load dữ liệu từ file CSV hoặc từ yfinance
# ========================
def load_data(ticker: str, csv_file: str) -> pd.DataFrame:
    # Nếu file CSV đã tồn tại thì đọc trực tiếp
    if os.path.exists(csv_file):
        df = pd.read_csv(csv_file, index_col=0)
        df.index = pd.to_datetime(df.index)
    else:
        # Nếu chưa có file thì tải dữ liệu từ yfinance
        df = yf.Ticker(ticker).history(period="max")
        if df.empty:
            raise ValueError(f"Không tải được dữ liệu cho {ticker}")
        # Tạo thư mục data nếu chưa có
        os.makedirs(os.path.dirname(csv_file), exist_ok=True)
        df.to_csv(csv_file)

    # Lọc dữ liệu từ năm 2015 để tránh dữ liệu quá ít
    df = df.loc["2015-01-01":].copy()
    return df


# ========================
# Cập nhật dữ liệu cho tất cả tickers
# ========================
def update_all_data(force_update: bool = False) -> None:
    """Update data cho tất cả tickers trong danh sách
    
    Args:
        force_update: Nếu True, tải lại toàn bộ data từ yfinance
    """
    os.makedirs("data", exist_ok=True)
    
    for ticker in TICKERS:
        try:
            csv_file = f"data/{ticker.replace('.', '_')}_stock_data.csv"
            
            if force_update or not os.path.exists(csv_file):
                print(f"Đang tải dữ liệu cho {ticker}...")
                df = yf.Ticker(ticker).history(period="max")
                
                if df.empty:
                    print(f"  ⚠️  Không tải được dữ liệu cho {ticker}")
                    continue
                    
                df.to_csv(csv_file)
                print(f"  ✓ Đã lưu {len(df)} dòng dữ liệu")
            else:
                print(f"  ✓ {ticker} đã có dữ liệu")
                
        except Exception as e:
            print(f"  ✗ Lỗi khi xử lý {ticker}: {e}")
