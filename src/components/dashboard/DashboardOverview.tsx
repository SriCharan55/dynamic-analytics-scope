import { Grid } from "lucide-react";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import FinanceWidget from "@/components/widgets/FinanceWidget";
import NewsWidget from "@/components/widgets/NewsWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserActivityChart } from "./UserActivityChart";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Welcome to your analytics dashboard
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <button className="flex items-center space-x-1 text-sm text-primary-500 dark:text-primary-400 hover:underline">
            <Grid className="h-4 w-4" />
            <span>Customize Dashboard</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">723</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7m 32s</div>
            <p className="text-xs text-muted-foreground mt-1">
              -2% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-2 lg:col-span-3">
          <WeatherWidget />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <FinanceWidget />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <NewsWidget />
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <UserActivityChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
