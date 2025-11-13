// constants/trainedStocks.ts
export const TRAINED_STOCKS = [
  "ACB",
  "BCM",
  "BID",
  "CTG",
  "DGC",
  "DPM",
  "FPT",
  "GAS",
  "GVR",
  "HDB",
  "HPG",
  "KDH",
  "MBB",
  "MSN",
  "MWG",
  "NVL",
  "PDR",
  "PLX",
  "PNJ",
  "POW",
  "REE",
  "SAB",
  "SBT",
  "STB",
  "TCB",
  "TPB",
  "VCB",
  "VCG",
  "VGC",
  "VHC",
  "VHM",
  "VIC",
  "VJC",
  "VNM",
  "VPB",
  "VRE",
  "BAF",
  "BVH",
  "VIB",
  "SSI",
];

export interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  description?: string;
}

export const STOCK_DETAILS: { [key: string]: StockInfo } = {
  ACB: {
    symbol: "ACB",
    name: "Ngân hàng TMCP Á Châu",
    sector: "Ngân hàng",
    marketCap: 150_000_000_000_000,
  },
  BCM: {
    symbol: "BCM",
    name: "Tổng Công ty Đầu tư và Phát triển Công nghiệp",
    sector: "Bất động sản KCN",
    marketCap: 80_000_000_000_000,
  },
  BID: {
    symbol: "BID",
    name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
    sector: "Ngân hàng",
    marketCap: 200_000_000_000_000,
  },
  CTG: {
    symbol: "CTG",
    name: "Ngân hàng TMCP Công thương Việt Nam",
    sector: "Ngân hàng",
    marketCap: 180_000_000_000_000,
  },
  DGC: {
    symbol: "DGC",
    name: "Tập đoàn Hóa chất Đức Giang",
    sector: "Hóa chất",
    marketCap: 60_000_000_000_000,
  },
  DPM: {
    symbol: "DPM",
    name: "Phân bón Dầu khí Cà Mau",
    sector: "Hóa chất",
    marketCap: 25_000_000_000_000,
  },
  FPT: {
    symbol: "FPT",
    name: "Tập đoàn FPT",
    sector: "Công nghệ",
    marketCap: 130_000_000_000_000,
  },
  GAS: {
    symbol: "GAS",
    name: "PV Gas - Tổng Công ty Khí Việt Nam",
    sector: "Dầu khí",
    marketCap: 260_000_000_000_000,
  },
  GVR: {
    symbol: "GVR",
    name: "Tập đoàn Công nghiệp Cao su Việt Nam",
    sector: "Cao su",
    marketCap: 45_000_000_000_000,
  },
  HDB: {
    symbol: "HDB",
    name: "Ngân hàng TMCP Phát triển TP.HCM",
    sector: "Ngân hàng",
    marketCap: 90_000_000_000_000,
  },
  HPG: {
    symbol: "HPG",
    name: "Tập đoàn Hòa Phát",
    sector: "Thép",
    marketCap: 140_000_000_000_000,
  },
  KDH: {
    symbol: "KDH",
    name: "Nhà Khang Điền",
    sector: "Bất động sản",
    marketCap: 20_000_000_000_000,
  },
  MBB: {
    symbol: "MBB",
    name: "Ngân hàng TMCP Quân đội",
    sector: "Ngân hàng",
    marketCap: 110_000_000_000_000,
  },
  MSN: {
    symbol: "MSN",
    name: "Tập đoàn Masan",
    sector: "Tiêu dùng",
    marketCap: 140_000_000_000_000,
  },
  MWG: {
    symbol: "MWG",
    name: "Thế Giới Di Động",
    sector: "Bán lẻ",
    marketCap: 130_000_000_000_000,
  },
  NVL: {
    symbol: "NVL",
    name: "Tập đoàn Novaland",
    sector: "Bất động sản",
    marketCap: 80_000_000_000_000,
  },
  PDR: {
    symbol: "PDR",
    name: "BĐS Phát Đạt",
    sector: "Bất động sản",
    marketCap: 20_000_000_000_000,
  },
  PLX: {
    symbol: "PLX",
    name: "Tập đoàn Xăng dầu Việt Nam (Petrolimex)",
    sector: "Dầu khí",
    marketCap: 60_000_000_000_000,
  },
  PNJ: {
    symbol: "PNJ",
    name: "Vàng bạc Đá quý Phú Nhuận",
    sector: "Bán lẻ",
    marketCap: 40_000_000_000_000,
  },
  POW: {
    symbol: "POW",
    name: "Điện lực Dầu khí Việt Nam",
    sector: "Năng lượng",
    marketCap: 70_000_000_000_000,
  },
  REE: {
    symbol: "REE",
    name: "Cơ điện lạnh REE",
    sector: "Công nghiệp",
    marketCap: 35_000_000_000_000,
  },
  SAB: {
    symbol: "SAB",
    name: "Bia Sài Gòn (Sabeco)",
    sector: "Tiêu dùng",
    marketCap: 160_000_000_000_000,
  },
  SBT: {
    symbol: "SBT",
    name: "Thành Thành Công - Biên Hòa",
    sector: "Nông nghiệp",
    marketCap: 20_000_000_000_000,
  },
  STB: {
    symbol: "STB",
    name: "Ngân hàng TMCP Sài Gòn Thương Tín",
    sector: "Ngân hàng",
    marketCap: 75_000_000_000_000,
  },
  TCB: {
    symbol: "TCB",
    name: "Ngân hàng TMCP Kỹ Thương Việt Nam",
    sector: "Ngân hàng",
    marketCap: 170_000_000_000_000,
  },
  TPB: {
    symbol: "TPB",
    name: "Ngân hàng TMCP Tiên Phong",
    sector: "Ngân hàng",
    marketCap: 60_000_000_000_000,
  },
  VCB: {
    symbol: "VCB",
    name: "Ngân hàng TMCP Ngoại thương Việt Nam",
    sector: "Ngân hàng",
    marketCap: 450_000_000_000_000,
  },
  VCG: {
    symbol: "VCG",
    name: "Vinaconex",
    sector: "Xây dựng",
    marketCap: 20_000_000_000_000,
  },
  VGC: {
    symbol: "VGC",
    name: "Viglacera",
    sector: "Vật liệu xây dựng",
    marketCap: 25_000_000_000_000,
  },
  VHC: {
    symbol: "VHC",
    name: "Vĩnh Hoàn Corp",
    sector: "Thủy sản",
    marketCap: 30_000_000_000_000,
  },
  VHM: {
    symbol: "VHM",
    name: "Vinhomes",
    sector: "Bất động sản",
    marketCap: 350_000_000_000_000,
  },
  VIC: {
    symbol: "VIC",
    name: "Tập đoàn Vingroup",
    sector: "Đa ngành",
    marketCap: 400_000_000_000_000,
  },
  VJC: {
    symbol: "VJC",
    name: "VietJet Air",
    sector: "Hàng không",
    marketCap: 90_000_000_000_000,
  },
  VNM: {
    symbol: "VNM",
    name: "Vinamilk",
    sector: "Thực phẩm",
    marketCap: 280_000_000_000_000,
  },
  VPB: {
    symbol: "VPB",
    name: "Ngân hàng TMCP Việt Nam Thịnh Vượng",
    sector: "Ngân hàng",
    marketCap: 190_000_000_000_000,
  },
  VRE: {
    symbol: "VRE",
    name: "Vincom Retail",
    sector: "Bất động sản",
    marketCap: 120_000_000_000_000,
  },
  BAF: {
    symbol: "BAF",
    name: "Nông nghiệp BAF Việt Nam",
    sector: "Nông nghiệp",
    marketCap: 10_000_000_000_000,
  },
  BVH: {
    symbol: "BVH",
    name: "Bảo Việt Holdings",
    sector: "Bảo hiểm",
    marketCap: 70_000_000_000_000,
  },
  VIB: {
    symbol: "VIB",
    name: "Ngân hàng TMCP Quốc tế Việt Nam",
    sector: "Ngân hàng",
    marketCap: 80_000_000_000_000,
  },
  SSI: {
    symbol: "SSI",
    name: "CTCP Chứng khoán SSI",
    sector: "Chứng khoán",
    marketCap: 45_000_000_000_000,
  },
};

// === Helpers ===
export const getStockInfo = (symbol: string): StockInfo => {
  return (
    STOCK_DETAILS[symbol] || {
      symbol,
      name: `Công ty ${symbol}`,
      sector: "Chưa phân loại",
      marketCap: 0,
    }
  );
};

export const getStocksBySector = (sector: string): StockInfo[] => {
  return Object.values(STOCK_DETAILS).filter(
    (stock) => stock.sector === sector
  );
};

export const searchStocks = (query: string): StockInfo[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(STOCK_DETAILS).filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(lowerQuery) ||
      stock.name.toLowerCase().includes(lowerQuery) ||
      stock.sector.toLowerCase().includes(lowerQuery)
  );
};
