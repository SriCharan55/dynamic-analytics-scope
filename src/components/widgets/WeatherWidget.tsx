
import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockWeatherData } from "@/services/mockData";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    date: string;
    temperature: number;
    condition: string;
  }[];
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, we'd fetch from an API
    // For now, use mock data with a delay to simulate loading
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setWeatherData(mockWeatherData);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="dashboard-card animate-pulse">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="dashboard-card-title">Weather</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="dashboard-card-title">Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">Unable to load weather data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card animate-enter">
      <CardHeader className="dashboard-card-header">
        <CardTitle className="dashboard-card-title">Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{weatherData.location}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            </div>
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div className="mt-4 flex items-end space-x-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{weatherData.temperature}°</span>
            <span className="text-xl text-gray-600 dark:text-gray-300">{weatherData.condition}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
                <p className="font-medium text-gray-900 dark:text-white">{weatherData.windSpeed} mph</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="font-medium text-gray-900 dark:text-white">{weatherData.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">7-Day Forecast</h4>
          <div className="grid grid-cols-7 gap-2">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">{day.date}</span>
                <div className="my-1">
                  {getWeatherIcon(day.condition)}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{day.temperature}°</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
