
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockFinanceData } from "@/services/mockData";

interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercentage: number;
  high: number;
  low: number;
  volume: number;
  marketCap: string;
  historicalData: {
    date: string;
    price: number;
  }[];
}

const FinanceWidget = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("1W"); // Options: 1D, 1W, 1M, 1Y

  useEffect(() => {
    // In a real implementation, we'd fetch from an API
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStockData(mockFinanceData);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const timeRangeOptions = ["1D", "1W", "1M", "1Y"];

  if (isLoading) {
    return (
      <Card className="dashboard-card animate-pulse">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="dashboard-card-title">Stock Market</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  if (!stockData) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="dashboard-card-title">Stock Market</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">Unable to load stock data.</p>
        </CardContent>
      </Card>
    );
  }

  const isPositive = stockData.change > 0;
  const colorClass = isPositive ? "text-green-600" : "text-red-600";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="dashboard-card animate-enter">
      <CardHeader className="dashboard-card-header">
        <CardTitle className="dashboard-card-title">Stock Market</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stockData.symbol}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stockData.name}</p>
            </div>
            <div className={`flex items-center ${colorClass}`}>
              <span className="text-2xl font-bold mr-1">${stockData.currentPrice.toFixed(2)}</span>
              <div className="flex items-center">
                <TrendIcon className="h-5 w-5 mr-1" />
                <span>{stockData.changePercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-4 space-x-1">
          {timeRangeOptions.map((option) => (
            <button
              key={option}
              onClick={() => setTimeRange(option)}
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                timeRange === option
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData.historicalData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={["dataMin - 5", "dataMax + 5"]} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderColor: "#e2e8f0",
                  borderRadius: "0.375rem",
                }}
                labelStyle={{ color: "#1f2937" }}
                itemStyle={{ color: "#3b82f6" }}
                formatter={(value: any) => [`$${value}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-medium text-gray-900 dark:text-white">{stockData.marketCap}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Volume</p>
            <p className="font-medium text-gray-900 dark:text-white">{stockData.volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Today's High</p>
            <p className="font-medium text-gray-900 dark:text-white">${stockData.high.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Today's Low</p>
            <p className="font-medium text-gray-900 dark:text-white">${stockData.low.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinanceWidget;
