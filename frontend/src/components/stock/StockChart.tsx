// components/stock/StockChart.tsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { BarChart2, TrendingUp, Calendar, Info } from "lucide-react";

interface StockChartProps {
  symbol: string;
  chartData: any[];
}

interface ChartData {
  date: string;
  price: number;
  volume?: number;
  change?: number;
  changePercent?: number;
}

interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  data: ChartData | null;
}

interface CrosshairPosition {
  x: number;
  y: number;
  visible: boolean;
}

const timeRanges = [
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "3M", value: "3M" },
  { label: "1Y", value: "1Y" },
  { label: "All", value: "ALL" },
];

const StockChart: React.FC<StockChartProps> = ({ symbol, chartData }) => {
  const [selectedRange, setSelectedRange] = useState("1M");
  const [lineData, setLineData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    data: null,
  });
  const [crosshair, setCrosshair] = useState<CrosshairPosition>({
    x: 0,
    y: 0,
    visible: false,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Tạo dữ liệu đường thực tế giống yfinance
  const generateRealisticLineData = useCallback(() => {
    const basePrice = chartData[0]?.close || 50000;
    const data: ChartData[] = [];

    // Tạo xu hướng chính với độ nhiễu nhỏ
    let currentPrice = basePrice;
    const trend = Math.random() > 0.5 ? 1 : -1; // Xu hướng tăng hoặc giảm
    const trendStrength = 0.001 + Math.random() * 0.002; // Sức mạnh xu hướng

    for (let i = 0; i < 30; i++) {
      // Thêm xu hướng và nhiễu ngẫu nhiên
      const dailyChange = (Math.random() - 0.5) * 0.02 * currentPrice;
      const trendComponent = trend * trendStrength * currentPrice;

      currentPrice = currentPrice + dailyChange + trendComponent;

      // Đảm bảo giá không âm
      currentPrice = Math.max(currentPrice, basePrice * 0.7);

      const previousPrice = data[i - 1]?.price || basePrice;
      const change = currentPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;

      data.push({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        price: currentPrice,
        volume: 1000000 + Math.random() * 9000000,
        change,
        changePercent,
      });
    }

    return data;
  }, [chartData]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const realisticData = generateRealisticLineData();
      setLineData(realisticData);
      setIsLoading(false);
    }, 500);
  }, [generateRealisticLineData, selectedRange]);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !lineData.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 30, right: 50, bottom: 40, left: 60 };

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, width, height);

    // Calculate price range với margin nhỏ
    const prices = lineData.map((d) => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const margin = priceRange * 0.05; // 5% margin
    const chartMinPrice = minPrice - margin;
    const chartMaxPrice = maxPrice + margin;
    const chartPriceRange = chartMaxPrice - chartMinPrice;

    // Draw grid
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);

    // Vertical grid lines (time)
    for (let i = 0; i <= 5; i++) {
      const x = padding.left + (i / 5) * (width - padding.left - padding.right);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, height - padding.bottom);
      ctx.stroke();
    }

    // Horizontal grid lines (price)
    const gridLines = 6;
    for (let i = 0; i <= gridLines; i++) {
      const y =
        padding.top + (height - padding.top - padding.bottom) * (i / gridLines);
      const price = chartMaxPrice - chartPriceRange * (i / gridLines);

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Price labels
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "12px monospace";
      ctx.textAlign = "right";
      ctx.fillText(price.toLocaleString("vi-VN"), padding.left - 10, y + 4);
    }

    ctx.setLineDash([]);

    // Draw time labels at bottom
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "11px monospace";
    ctx.textAlign = "center";

    // Show only some labels to avoid crowding
    const labelInterval = Math.ceil(lineData.length / 8);
    lineData.forEach((dataPoint, index) => {
      if (index % labelInterval === 0 || index === lineData.length - 1) {
        const x =
          padding.left +
          (index / (lineData.length - 1)) *
            (width - padding.left - padding.right);
        const date = new Date(dataPoint.date);
        const label = `${date.getDate()}/${date.getMonth() + 1}`;
        ctx.fillText(label, x, height - 15);
      }
    });

    // Draw price line (đường giá chính)
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.beginPath();

    lineData.forEach((dataPoint, index) => {
      const x =
        padding.left +
        (index / (lineData.length - 1)) *
          (width - padding.left - padding.right);
      const y =
        padding.top +
        ((chartMaxPrice - dataPoint.price) / chartPriceRange) *
          (height - padding.top - padding.bottom);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw gradient fill under the line
    if (lineData.length > 1) {
      const gradient = ctx.createLinearGradient(
        0,
        padding.top,
        0,
        height - padding.bottom
      );
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");

      ctx.fillStyle = gradient;
      ctx.beginPath();

      // Start from bottom left
      ctx.moveTo(padding.left, height - padding.bottom);

      // Follow the price line
      lineData.forEach((dataPoint, index) => {
        const x =
          padding.left +
          (index / (lineData.length - 1)) *
            (width - padding.left - padding.right);
        const y =
          padding.top +
          ((chartMaxPrice - dataPoint.price) / chartPriceRange) *
            (height - padding.top - padding.bottom);
        ctx.lineTo(x, y);
      });

      // End at bottom right
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.closePath();
      ctx.fill();
    }

    // Draw current price marker
    if (lineData.length > 0) {
      const lastDataPoint = lineData[lineData.length - 1];
      const lastX =
        padding.left +
        ((lineData.length - 1) / (lineData.length - 1)) *
          (width - padding.left - padding.right);
      const lastY =
        padding.top +
        ((chartMaxPrice - lastDataPoint.price) / chartPriceRange) *
          (height - padding.top - padding.bottom);

      // Draw marker circle
      ctx.fillStyle = "#3b82f6";
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Draw white border
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw crosshair nếu đang hiển thị
    if (crosshair.visible) {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 3]);

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(crosshair.x, padding.top);
      ctx.lineTo(crosshair.x, height - padding.bottom);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(padding.left, crosshair.y);
      ctx.lineTo(width - padding.right, crosshair.y);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw price label tại horizontal line
      const priceAtCrosshair =
        chartMaxPrice -
        ((crosshair.y - padding.top) /
          (height - padding.top - padding.bottom)) *
          chartPriceRange;

      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(width - padding.right + 5, crosshair.y - 10, 45, 20);
      ctx.fillStyle = "#ffffff";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        priceAtCrosshair.toLocaleString("vi-VN"),
        width - padding.right + 27,
        crosshair.y + 3
      );

      // Draw time label tại vertical line
      const timeRatio =
        (crosshair.x - padding.left) / (width - padding.left - padding.right);
      const dataIndex = Math.min(
        Math.round(timeRatio * (lineData.length - 1)),
        lineData.length - 1
      );

      if (dataIndex >= 0 && dataIndex < lineData.length) {
        const dataPoint = lineData[dataIndex];
        const date = new Date(dataPoint.date);
        const timeLabel = `${date.getDate()}/${date.getMonth() + 1}`;

        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(crosshair.x - 22, height - padding.bottom + 5, 44, 20);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(timeLabel, crosshair.x, height - padding.bottom + 18);
      }
    }
  }, [lineData, crosshair]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !lineData.length) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { left: 60, right: 50, top: 30, bottom: 40 };

    // Kiểm tra xem chuột có trong vùng biểu đồ không
    const isInChartArea =
      x >= padding.left &&
      x <= canvas.width - padding.right &&
      y >= padding.top &&
      y <= canvas.height - padding.bottom;

    if (isInChartArea) {
      // Cập nhật crosshair position
      setCrosshair({
        x: x,
        y: y,
        visible: true,
      });

      // Find which data point is closest to cursor
      const xRatio =
        (x - padding.left) / (canvas.width - padding.left - padding.right);
      const dataIndex = Math.min(
        Math.round(xRatio * (lineData.length - 1)),
        lineData.length - 1
      );

      if (dataIndex >= 0 && dataIndex < lineData.length) {
        const dataPoint = lineData[dataIndex];

        setTooltip({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          data: dataPoint,
        });
      }
    } else {
      setCrosshair({ x: 0, y: 0, visible: false });
      setTooltip({ visible: false, x: 0, y: 0, data: null });
    }
  };

  const handleMouseLeave = () => {
    setCrosshair({ x: 0, y: 0, visible: false });
    setTooltip({ visible: false, x: 0, y: 0, data: null });
  };

  useEffect(() => {
    if (!isLoading) {
      drawChart();
    }
  }, [drawChart, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 h-[500px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <h2 className="flex items-center text-xl font-bold text-blue-400">
            <TrendingUp size={22} className="mr-2" />
            Biểu đồ Giá ({symbol})
          </h2>
          <div className="flex space-x-2 text-sm">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedRange === range.value
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-[400px] bg-gray-900 rounded-lg">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-gray-400">Đang tải biểu đồ...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 h-[500px]">
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
        <h2 className="flex items-center text-xl font-bold text-blue-400">
          <TrendingUp size={22} className="mr-2" />
          Biểu đồ Giá ({symbol})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span>Giá đóng cửa</span>
            </div>
          </div>
          <div className="flex space-x-2 text-sm">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedRange === range.value
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-[400px] bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full cursor-crosshair"
        />

        {/* Tooltip */}
        {tooltip.visible && tooltip.data && (
          <div
            className="absolute bg-gray-800 border border-gray-600 rounded-lg shadow-2xl p-3 text-sm z-10 min-w-[200px]"
            style={{
              left: `${tooltip.x - 330}px`,
              top: `${tooltip.y - 500}px`,
            }}
          >
            <div className="font-semibold text-white mb-2">
              {new Date(tooltip.data.date).toLocaleDateString("vi-VN")}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Giá:</span>
                <span className="text-white font-mono">
                  {tooltip.data.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
              {tooltip.data.change !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Thay đổi:</span>
                  <span
                    className={`font-mono ${
                      (tooltip.data.change || 0) >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {(tooltip.data.change || 0) >= 0 ? "+" : ""}
                    {(tooltip.data.change || 0).toFixed(0)}₫ (
                    {(tooltip.data.changePercent || 0) >= 0 ? "+" : ""}
                    {(tooltip.data.changePercent || 0).toFixed(2)}%)
                  </span>
                </div>
              )}
              {tooltip.data.volume && (
                <div className="flex justify-between">
                  <span className="text-gray-400">KL:</span>
                  <span className="text-white font-mono">
                    {(tooltip.data.volume / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Current Price Display */}
        {lineData.length > 0 && (
          <div className="absolute top-3 right-3 bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-xs text-gray-400">Giá hiện tại</div>
            <div className="text-lg font-bold text-white font-mono">
              {lineData[lineData.length - 1].price.toLocaleString("vi-VN")}₫
            </div>
            {lineData[lineData.length - 1].change !== undefined && (
              <div
                className={`text-sm font-mono ${
                  (lineData[lineData.length - 1].change || 0) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {(lineData[lineData.length - 1].change || 0) >= 0 ? "+" : ""}
                {(lineData[lineData.length - 1].change || 0).toFixed(0)}₫ (
                {(lineData[lineData.length - 1].changePercent || 0) >= 0
                  ? "+"
                  : ""}
                {(lineData[lineData.length - 1].changePercent || 0).toFixed(2)}
                %)
              </div>
            )}
          </div>
        )}

        {/* Chart Legend */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-300">
          <div className="flex items-center space-x-4">
            <span>Di chuột để xem chi tiết từng ngày</span>
            <Info size={12} className="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Time Scale Info */}
      <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <Calendar size={14} />
          <span>Khung thời gian: {selectedRange}</span>
        </div>
        <div className="text-right">
          <div className="text-gray-300">
            Dữ liệu từ {lineData[0]?.date} đến{" "}
            {lineData[lineData.length - 1]?.date}
          </div>
          <div className="text-xs text-gray-500">
            {lineData.length} phiên giao dịch • Biểu đồ đường
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
