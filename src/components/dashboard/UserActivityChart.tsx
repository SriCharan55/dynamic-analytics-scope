
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const data = [
  { time: "00:00", users: 210 },
  { time: "03:00", users: 150 },
  { time: "06:00", users: 180 },
  { time: "09:00", users: 420 },
  { time: "12:00", users: 650 },
  { time: "15:00", users: 780 },
  { time: "18:00", users: 520 },
  { time: "21:00", users: 350 },
];

const config = {
  users: {
    label: "Active Users",
    color: "hsl(var(--primary))",
  },
};

export const UserActivityChart = () => {
  return (
    <Card className="dashboard-card h-full">
      <CardHeader className="dashboard-card-header">
        <CardTitle className="dashboard-card-title">User Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px]">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="time"
                  stroke="currentColor"
                  className="text-muted-foreground"
                />
                <YAxis
                  stroke="currentColor"
                  className="text-muted-foreground"
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      formatter={(value) => `${value} users`}
                    />
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="currentColor"
                  strokeWidth={2}
                  dot={false}
                  className="stroke-primary"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
