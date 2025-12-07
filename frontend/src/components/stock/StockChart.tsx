// components/stock/StockChart.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { BarChart2, TrendingUp, TrendingDown } from "lucide-react";

const timeRanges = [
  { label: "1D", value: "1D", days: 1 },
  { label: "5D", value: "5D", days: 5 },
  { label: "1M", value: "1M", days: 30 },
  { label: "6M", value: "6M", days: 180 },
  {
    label: "YTD",
    value: "YTD",
    days: new Date().getDate() + new Date().getMonth() * 30,
  },
  { label: "1Y", value: "1Y", days: 365 },
  { label: "5Y", value: "5Y", days: 365 * 5 },
  { label: "MAX", value: "MAX", days: 365 * 20 },
];

interface StockChartProps {
  symbol: string;
  chartData: any[];
}

interface CrosshairPosition {
  x: number;
  y: number;
  dataPoint: any;
  index: number;
  priceAtMouseY: number;
}

interface AxisLabel {
  position: number;
  label: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol, chartData = [] }) => {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [crosshair, setCrosshair] = useState<CrosshairPosition | null>(null);
  const [containerSize, setContainerSize] = useState({
    width: 800,
    height: 400,
  });
  const chartRef = useRef<HTMLDivElement>(null);

  // Cập nhật kích thước container
  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        const rect = chartRef.current.getBoundingClientRect();
        setContainerSize({
          width: Math.max(rect.width, 600),
          height: Math.max(rect.height, 300),
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Lọc dữ liệu theo khoảng thời gian selected
  const filteredData = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];

    const range = timeRanges.find((r) => r.value === selectedRange);
    if (!range || range.value === "MAX") return chartData;

    if (range.value === "YTD") {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      return chartData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfYear;
      });
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - range.days);

    return chartData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [chartData, selectedRange]);

  // Tính toán các giá trị cho biểu đồ
  const chartValues = useMemo(() => {
    if (!filteredData.length)
      return {
        maxPrice: 0,
        minPrice: 0,
        currentPrice: 0,
        priceChange: 0,
        priceChangePercent: 0,
        prices: [],
      };

    const prices = filteredData.map((d) => d.close || d.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const currentPrice = prices[prices.length - 1] || 0;
    const firstPrice = prices[0] || 0;
    const priceChange = currentPrice - firstPrice;
    const priceChangePercent = firstPrice
      ? (priceChange / firstPrice) * 100
      : 0;

    return {
      maxPrice,
      minPrice,
      currentPrice,
      priceChange,
      priceChangePercent,
      prices,
    };
  }, [filteredData]);

  const { maxPrice, minPrice, currentPrice, priceChange, priceChangePercent } =
    chartValues;

  const chartHeight = containerSize.height;
  const chartWidth = containerSize.width;
  const padding = { top: 40, right: 80, bottom: 60, left: 80 };

  const getXPosition = (index: number) => {
    if (!filteredData.length || filteredData.length === 1) return padding.left;
    return (
      padding.left +
      (index / (filteredData.length - 1)) *
      (chartWidth - padding.left - padding.right)
    );
  };

  const getYPosition = (price: number) => {
    const range = maxPrice - minPrice;
    if (range === 0) return chartHeight / 2;
    return (
      padding.top +
      ((maxPrice - price) / range) *
      (chartHeight - padding.top - padding.bottom)
    );
  };

  // Tìm điểm dữ liệu gần vị trí chuột nhất
  const findNearestDataPoint = (mouseX: number) => {
    if (!filteredData.length) return null;

    const availableWidth = chartWidth - padding.left - padding.right;
    const relativeX = mouseX - padding.left;
    const index = Math.round(
      (relativeX / availableWidth) * (filteredData.length - 1)
    );

    const clampedIndex = Math.max(0, Math.min(index, filteredData.length - 1));
    return {
      index: clampedIndex,
      dataPoint: filteredData[clampedIndex],
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!chartRef.current || !filteredData.length) return;

    const rect = chartRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
      mouseX < padding.left ||
      mouseX > chartWidth - padding.right ||
      mouseY < padding.top ||
      mouseY > chartHeight - padding.bottom
    ) {
      setCrosshair(null);
      return;
    }

    const nearest = findNearestDataPoint(mouseX);
    if (nearest) {
      const priceAtMouseY =
        maxPrice -
        ((mouseY - padding.top) /
          (chartHeight - padding.top - padding.bottom)) *
        (maxPrice - minPrice);

      setCrosshair({
        x: getXPosition(nearest.index),
        y: getYPosition(nearest.dataPoint.close || nearest.dataPoint.price),
        dataPoint: nearest.dataPoint,
        index: nearest.index,
        priceAtMouseY: priceAtMouseY,
      });
    }
  };

  const handleMouseLeave = () => {
    setCrosshair(null);
  };

  // Format thời gian theo khoảng thời gian được chọn
  const formatTimeByRange = (
    dateString: string,
    index: number,
    total: number
  ) => {
    const date = new Date(dateString);

    switch (selectedRange) {
      case "1D":
        return date.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "5D":
        if (index % Math.ceil(total / 4) !== 0 && index !== total - 1)
          return "";
        return date.toLocaleDateString("vi-VN", {
          month: "short",
          day: "numeric",
        });
      case "1M":
        if (index % Math.ceil(total / 5) !== 0 && index !== total - 1)
          return "";
        return date.toLocaleDateString("vi-VN", {
          month: "short",
          day: "numeric",
        });
      case "6M":
      case "YTD":
        if (index % Math.ceil(total / 6) !== 0 && index !== total - 1)
          return "";
        return date.toLocaleDateString("vi-VN", {
          month: "short",
          year: "numeric",
        });
      case "1Y":
      case "5Y":
        if (index % Math.ceil(total / 4) !== 0 && index !== total - 1)
          return "";
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
        });
      default:
        if (index % Math.ceil(total / 5) !== 0 && index !== total - 1)
          return "";
        return date.toLocaleDateString("vi-VN", {
          year: "numeric",
        });
    }
  };

  // Lấy các điểm để hiển thị trên trục X
  const getXAxisLabels = (): AxisLabel[] => {
    if (!filteredData.length) return [];

    const labels: AxisLabel[] = [];

    const maxLabels = Math.min(5, Math.floor(chartWidth / 120));
    const step = Math.max(1, Math.floor(filteredData.length / maxLabels));

    for (let i = 0; i < filteredData.length; i += step) {
      const label = formatTimeByRange(
        filteredData[i].date,
        i,
        filteredData.length
      );
      if (label) {
        labels.push({
          position: getXPosition(i),
          label: label,
        });
      }
    }

    if (filteredData.length > 0) {
      const lastLabel = formatTimeByRange(
        filteredData[filteredData.length - 1].date,
        filteredData.length - 1,
        filteredData.length
      );
      if (lastLabel && !labels.some((l) => l.label === lastLabel)) {
        labels.push({
          position: getXPosition(filteredData.length - 1),
          label: lastLabel,
        });
      }
    }

    return labels;
  };

  // Lấy các điểm để hiển thị trên trục Y
  const getYAxisLabels = (): AxisLabel[] => {
    if (maxPrice === minPrice || !filteredData.length) return [];

    const labels: AxisLabel[] = [];
    const steps = Math.min(5, Math.floor(chartHeight / 60));
    const stepValue = (maxPrice - minPrice) / (steps - 1);

    for (let i = 0; i < steps; i++) {
      const value = minPrice + stepValue * i;
      const position = getYPosition(value);
      labels.push({
        position,
        label: value.toLocaleString("vi-VN", {
          minimumFractionDigits: value < 1 ? 4 : 2,
          maximumFractionDigits: value < 1 ? 4 : 2,
        }),
      });
    }

    return labels;
  };

  // Tạo path cho area gradient
  const getAreaPath = () => {
    if (!filteredData.length) return "";

    const points = filteredData
      .map((d, i) => `${getXPosition(i)},${getYPosition(d.close || d.price)}`)
      .join(" ");

    return `M${points} L${chartWidth - padding.right},${chartHeight - padding.bottom
      } L${padding.left},${chartHeight - padding.bottom} Z`;
  };

  if (!filteredData.length) {
    return (
      <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <h2 className="flex items-center text-xl font-bold text-brand-orange">
            <BarChart2 size={22} className="mr-2" />
            Biểu đồ Giá ({symbol})
          </h2>
        </div>
        <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg text-gray-400">
          Không có dữ liệu biểu đồ
        </div>
      </div>
    );
  }

  const xAxisLabels = getXAxisLabels();
  const yAxisLabels = getYAxisLabels();
  const areaPath = getAreaPath();

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 border-b border-gray-700 pb-3 gap-3">
        <h2 className="flex items-center text-xl font-bold text-brand-orange">
          <BarChart2 size={22} className="mr-2" />
          Biểu đồ Giá ({symbol})
        </h2>
        <div className="flex flex-wrap gap-1 text-sm">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-2 py-1 rounded transition-colors text-xs lg:text-sm ${selectedRange === range.value
                  ? "bg-brand-orange text-white font-semibold"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Biểu đồ */}
      <div
        ref={chartRef}
        className="relative w-full h-[400px] min-h-[300px] bg-gray-900 rounded-lg border border-gray-600 cursor-crosshair overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          width={chartWidth}
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="absolute inset-0"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#F97316" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yAxisLabels.map((label, index) => (
            <line
              key={`h-grid-${index}`}
              x1={padding.left}
              y1={label.position}
              x2={chartWidth - padding.right}
              y2={label.position}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {xAxisLabels.map((label, index) => (
            <line
              key={`v-grid-${index}`}
              x1={label.position}
              y1={padding.top}
              x2={label.position}
              y2={chartHeight - padding.bottom}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Area under line */}
          <path d={areaPath} fill="url(#priceGradient)" fillOpacity="0.8" />

          {/* Price line */}
          <polyline
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={filteredData
              .map(
                (d, i) =>
                  `${getXPosition(i)},${getYPosition(d.close || d.price)}`
              )
              .join(" ")}
          />

          {/* Crosshair */}
          {crosshair && (
            <g>
              <line
                x1={crosshair.x}
                y1={padding.top}
                x2={crosshair.x}
                y2={chartHeight - padding.bottom}
                stroke="#6B7280"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <line
                x1={padding.left}
                y1={crosshair.y}
                x2={chartWidth - padding.right}
                y2={crosshair.y}
                stroke="#6B7280"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <circle
                cx={crosshair.x}
                cy={crosshair.y}
                r="6"
                fill="#F97316"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}

          {/* X-axis labels */}
          {xAxisLabels.map((label, index) => (
            <text
              key={`x-label-${index}`}
              x={label.position}
              y={chartHeight - 20}
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="11"
              fontFamily="system-ui, sans-serif"
            >
              {label.label}
            </text>
          ))}

          {/* Y-axis labels */}
          {yAxisLabels.map((label, index) => (
            <text
              key={`y-label-${index}`}
              x={padding.left - 10}
              y={label.position + 4}
              textAnchor="end"
              fill="#9CA3AF"
              fontSize="11"
              fontFamily="system-ui, sans-serif"
            >
              {label.label}
            </text>
          ))}
        </svg>

        {/* TOOLTIP BÊN CẠNH CHUỘT */}
        {crosshair && (
          <div
            className="absolute bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl min-w-[200px] z-20 pointer-events-none"
            style={{
              left: `${crosshair.x + 20}px`,
              top: `${Math.max(
                20,
                Math.min(chartHeight - 200, crosshair.y - 100)
              )}px`,
            }}
          >
            <div className="text-sm text-gray-400 mb-2">
              {new Date(crosshair.dataPoint.date).toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: selectedRange === "1D" ? "2-digit" : undefined,
                minute: selectedRange === "1D" ? "2-digit" : undefined,
              })}
            </div>

            <div className="text-white font-bold text-lg mb-3">
              {(
                crosshair.dataPoint.close || crosshair.dataPoint.price
              ).toLocaleString("vi-VN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              ₫
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="text-gray-400">Mở cửa:</div>
              <div className="text-white text-right">
                {(
                  crosshair.dataPoint.open || crosshair.dataPoint.close
                ).toLocaleString("vi-VN")}
                ₫
              </div>

              <div className="text-gray-400">Cao nhất:</div>
              <div className="text-green-400 text-right">
                {(
                  crosshair.dataPoint.high || crosshair.dataPoint.close
                ).toLocaleString("vi-VN")}
                ₫
              </div>

              <div className="text-gray-400">Thấp nhất:</div>
              <div className="text-red-400 text-right">
                {(
                  crosshair.dataPoint.low || crosshair.dataPoint.close
                ).toLocaleString("vi-VN")}
                ₫
              </div>

              <div className="text-gray-400">Khối lượng:</div>
              <div className="text-white text-right">
                {crosshair.dataPoint.volume
                  ? crosshair.dataPoint.volume > 1e6
                    ? `${(crosshair.dataPoint.volume / 1e6).toFixed(2)}M`
                    : crosshair.dataPoint.volume > 1e3
                      ? `${(crosshair.dataPoint.volume / 1e3).toFixed(2)}K`
                      : crosshair.dataPoint.volume.toLocaleString()
                  : "N/A"}
              </div>
            </div>
          </div>
        )}

        {/* Crosshair info boxes */}
        {crosshair && (
          <>
            {/* Price label */}
            <div
              className="absolute bg-gray-800 border border-gray-600 text-white text-xs font-medium px-3 py-2 rounded pointer-events-none z-20 shadow-lg"
              style={{
                right: "10px",
                top: `${Math.max(
                  padding.top,
                  Math.min(chartHeight - 60, crosshair.y - 20)
                )}px`,
              }}
            >
              <div className="font-bold text-sm">
                {(
                  crosshair.dataPoint.close || crosshair.dataPoint.price
                ).toLocaleString("vi-VN")}
                ₫
              </div>
            </div>

            {/* Time label */}
            <div
              className="absolute bg-gray-800 border border-gray-600 text-white text-xs font-medium px-3 py-2 rounded pointer-events-none z-20 shadow-lg"
              style={{
                left: `${Math.max(
                  padding.left,
                  Math.min(chartWidth - 120, crosshair.x - 50)
                )}px`,
                bottom: "10px",
              }}
            >
              {new Date(crosshair.dataPoint.date).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: selectedRange === "1D" ? "2-digit" : undefined,
                minute: selectedRange === "1D" ? "2-digit" : undefined,
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StockChart;
