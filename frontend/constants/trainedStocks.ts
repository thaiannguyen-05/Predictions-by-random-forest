// constants/trainedStocks.ts
export const TRAINED_STOCKS = [
  'ACB', 'BCM', 'BID', 'CTG', 'DGC', 'DPM', 'FPT', 'GAS', 'GVR', 'HDB',
  'HPG', 'KDH', 'MBB', 'MSN', 'MWG', 'NVL', 'PDR', 'PLX', 'PNJ', 'POW',
  'REE', 'SAB', 'SBT', 'SSL', 'STB', 'TCB', 'TPB', 'VCB', 'VCG', 'VCL',
  'VGC', 'VHC', 'VHM', 'VIC', 'VJC', 'VNM', 'VPB', 'VRE'
];

export interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  description?: string;
}

export const STOCK_DETAILS: { [key: string]: StockInfo } = {
  'ACB': { 
    symbol: 'ACB', 
    name: 'Ngân hàng TMCP Á Châu', 
    sector: 'Ngân hàng', 
    marketCap: 150000000000000,
    description: 'Ngân hàng thương mại cổ phần Á Châu'
  },
  'BCM': { 
    symbol: 'BCM', 
    name: 'Công ty CP Đầu tư Bảo Minh', 
    sector: 'Bảo hiểm', 
    marketCap: 80000000000000,
    description: 'Tập đoàn bảo hiểm và đầu tư tài chính'
  },
  'BID': { 
    symbol: 'BID', 
    name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam', 
    sector: 'Ngân hàng', 
    marketCap: 200000000000000,
    description: 'Ngân hàng thương mại cổ phần đầu tư và phát triển'
  },
  'CTG': { 
    symbol: 'CTG', 
    name: 'Ngân hàng TMCP Công thương Việt Nam', 
    sector: 'Ngân hàng', 
    marketCap: 180000000000000,
    description: 'Ngân hàng thương mại cổ phần công thương Việt Nam'
  },
  'DGC': { 
    symbol: 'DGC', 
    name: 'Công ty CP Tập đoàn Hóa chất Đức Giang', 
    sector: 'Hóa chất', 
    marketCap: 12000000000000,
    description: 'Sản xuất và kinh doanh hóa chất công nghiệp'
  },
  'DPM': { 
    symbol: 'DPM', 
    name: 'Công ty CP Phân bón Dầu khí Cà Mau', 
    sector: 'Hóa chất', 
    marketCap: 25000000000000,
    description: 'Sản xuất phân bón và hóa chất từ dầu khí'
  },
  'FPT': { 
    symbol: 'FPT', 
    name: 'Tập đoàn FPT', 
    sector: 'Công nghệ', 
    marketCap: 100000000000000,
    description: 'Tập đoàn công nghệ và viễn thông hàng đầu Việt Nam'
  },
  'GAS': { 
    symbol: 'GAS', 
    name: 'Tập đoàn Khí Việt Nam', 
    sector: 'Dầu khí', 
    marketCap: 300000000000000,
    description: 'Khai thác, vận chuyển và kinh doanh khí đốt'
  },
  'GVR': { 
    symbol: 'GVR', 
    name: 'Tập đoàn Công nghiệp Cao su Việt Nam', 
    sector: 'Cao su', 
    marketCap: 45000000000000,
    description: 'Sản xuất và chế biến cao su công nghiệp'
  },
  'HDB': { 
    symbol: 'HDB', 
    name: 'Ngân hàng TMCP Phát triển TP.HCM', 
    sector: 'Ngân hàng', 
    marketCap: 90000000000000,
    description: 'Ngân hàng thương mại cổ phần phát triển TP.HCM'
  },
  'HPG': { 
    symbol: 'HPG', 
    name: 'Tập đoàn Hòa Phát', 
    sector: 'Thép', 
    marketCap: 120000000000000,
    description: 'Tập đoàn sản xuất thép và vật liệu xây dựng'
  },
  'KDH': { 
    symbol: 'KDH', 
    name: 'Công ty CP Đầu tư và Kinh doanh Nhà Khang Điền', 
    sector: 'Bất động sản', 
    marketCap: 15000000000000,
    description: 'Đầu tư và phát triển bất động sản'
  },
  'MBB': { 
    symbol: 'MBB', 
    name: 'Ngân hàng TMCP Quân đội', 
    sector: 'Ngân hàng', 
    marketCap: 110000000000000,
    description: 'Ngân hàng thương mại cổ phần quân đội'
  },
  'MSN': { 
    symbol: 'MSN', 
    name: 'Tập đoàn Masan', 
    sector: 'Tiêu dùng', 
    marketCap: 140000000000000,
    description: 'Tập đoàn hàng tiêu dùng và thực phẩm'
  },
  'MWG': { 
    symbol: 'MWG', 
    name: 'Công ty CP Đầu tư Thế Giới Di Động', 
    sector: 'Bán lẻ', 
    marketCap: 130000000000000,
    description: 'Bán lẻ thiết bị điện tử và điện máy'
  },
  'NVL': { 
    symbol: 'NVL', 
    name: 'Tập đoàn Đầu tư Địa ốc No Va', 
    sector: 'Bất động sản', 
    marketCap: 80000000000000,
    description: 'Đầu tư và phát triển bất động sản'
  },
  'PDR': { 
    symbol: 'PDR', 
    name: 'Công ty CP Phát triển Bất động sản Phát Đạt', 
    sector: 'Bất động sản', 
    marketCap: 20000000000000,
    description: 'Phát triển dự án bất động sản'
  },
  'PLX': { 
    symbol: 'PLX', 
    name: 'Tập đoàn Xăng dầu Việt Nam', 
    sector: 'Dầu khí', 
    marketCap: 60000000000000,
    description: 'Kinh doanh xăng dầu và năng lượng'
  },
  'PNJ': { 
    symbol: 'PNJ', 
    name: 'Công ty CP Vàng bạc Đá quý Phú Nhuận', 
    sector: 'Bán lẻ', 
    marketCap: 40000000000000,
    description: 'Kinh doanh trang sức và đá quý'
  },
  'POW': { 
    symbol: 'POW', 
    name: 'Tập đoàn Điện lực Dầu khí Việt Nam', 
    sector: 'Năng lượng', 
    marketCap: 70000000000000,
    description: 'Sản xuất và kinh doanh điện năng'
  },
  'REE': { 
    symbol: 'REE', 
    name: 'Công ty CP Cơ điện lạnh', 
    sector: 'Công nghiệp', 
    marketCap: 35000000000000,
    description: 'Cơ điện lạnh và kỹ thuật công nghiệp'
  },
  'SAB': { 
    symbol: 'SAB', 
    name: 'Tập đoàn Bia Sài Gòn - Miền Trung', 
    sector: 'Tiêu dùng', 
    marketCap: 160000000000000,
    description: 'Sản xuất và kinh doanh bia và đồ uống'
  },
  'SBT': { 
    symbol: 'SBT', 
    name: 'Công ty CP Đường Sông Bé', 
    sector: 'Nông nghiệp', 
    marketCap: 12000000000000,
    description: 'Sản xuất đường và nông sản'
  },
  'SSL': { 
    symbol: 'SSL', 
    name: 'Công ty CP Dịch vụ Sông Đà', 
    sector: 'Xây dựng', 
    marketCap: 8000000000000,
    description: 'Dịch vụ kỹ thuật và xây dựng'
  },
  'STB': { 
    symbol: 'STB', 
    name: 'Ngân hàng TMCP Sài Gòn Thương Tín', 
    sector: 'Ngân hàng', 
    marketCap: 75000000000000,
    description: 'Ngân hàng thương mại cổ phần Sài Gòn Thương Tín'
  },
  'TCB': { 
    symbol: 'TCB', 
    name: 'Ngân hàng TMCP Kỹ thương Việt Nam', 
    sector: 'Ngân hàng', 
    marketCap: 170000000000000,
    description: 'Ngân hàng thương mại cổ phần kỹ thương'
  },
  'TPB': { 
    symbol: 'TPB', 
    name: 'Ngân hàng TMCP Tiên Phong', 
    sector: 'Ngân hàng', 
    marketCap: 60000000000000,
    description: 'Ngân hàng thương mại cổ phần tiên phong'
  },
  'VCB': { 
    symbol: 'VCB', 
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam', 
    sector: 'Ngân hàng', 
    marketCap: 450000000000000,
    description: 'Ngân hàng thương mại cổ phần ngoại thương Việt Nam'
  },
  'VCG': { 
    symbol: 'VCG', 
    name: 'Tập đoàn Viettel', 
    sector: 'Viễn thông', 
    marketCap: 220000000000000,
    description: 'Tập đoàn viễn thông và công nghệ quân đội'
  },
  'VCL': { 
    symbol: 'VCL', 
    name: 'Công ty CP Vận tải Biển Vinaship', 
    sector: 'Vận tải', 
    marketCap: 5000000000000,
    description: 'Vận tải biển và logistics'
  },
  'VGC': { 
    symbol: 'VGC', 
    name: 'Công ty CP Viglacera', 
    sector: 'Vật liệu xây dựng', 
    marketCap: 25000000000000,
    description: 'Sản xuất vật liệu xây dựng và gốm sứ'
  },
  'VHC': { 
    symbol: 'VHC', 
    name: 'Công ty CP Chăn nuôi CP Việt Nam', 
    sector: 'Thực phẩm', 
    marketCap: 30000000000000,
    description: 'Chăn nuôi và chế biến thực phẩm'
  },
  'VHM': { 
    symbol: 'VHM', 
    name: 'Công ty CP Vinhomes', 
    sector: 'Bất động sản', 
    marketCap: 350000000000000,
    description: 'Phát triển dự án bất động sản cao cấp'
  },
  'VIC': { 
    symbol: 'VIC', 
    name: 'Tập đoàn Vingroup', 
    sector: 'Bất động sản', 
    marketCap: 400000000000000,
    description: 'Tập đoàn đa ngành hàng đầu Việt Nam'
  },
  'VJC': { 
    symbol: 'VJC', 
    name: 'Công ty CP Hàng không VietJet', 
    sector: 'Hàng không', 
    marketCap: 90000000000000,
    description: 'Hãng hàng không thương mại'
  },
  'VNM': { 
    symbol: 'VNM', 
    name: 'Công ty CP Sữa Việt Nam', 
    sector: 'Thực phẩm', 
    marketCap: 280000000000000,
    description: 'Sản xuất và kinh doanh sữa và sản phẩm từ sữa'
  },
  'VPB': { 
    symbol: 'VPB', 
    name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', 
    sector: 'Ngân hàng', 
    marketCap: 190000000000000,
    description: 'Ngân hàng thương mại cổ phần Việt Nam thịnh vượng'
  },
  'VRE': { 
    symbol: 'VRE', 
    name: 'Công ty CP Vincom Retail', 
    sector: 'Bất động sản', 
    marketCap: 120000000000000,
    description: 'Kinh doanh trung tâm thương mại và bán lẻ'
  },
};

// Hàm helper để lấy thông tin cổ phiếu
export const getStockInfo = (symbol: string): StockInfo => {
  return STOCK_DETAILS[symbol] || {
    symbol,
    name: `Công ty ${symbol}`,
    sector: 'Chưa phân loại',
    marketCap: 0
  };
};

// Hàm lọc cổ phiếu theo sector
export const getStocksBySector = (sector: string): StockInfo[] => {
  return Object.values(STOCK_DETAILS).filter(stock => stock.sector === sector);
};

// Hàm tìm kiếm cổ phiếu
export const searchStocks = (query: string): StockInfo[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(STOCK_DETAILS).filter(stock =>
    stock.symbol.toLowerCase().includes(lowerQuery) ||
    stock.name.toLowerCase().includes(lowerQuery) ||
    stock.sector.toLowerCase().includes(lowerQuery)
  );
};