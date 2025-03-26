"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metrics } from "@/lib/types";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CustomerChartsProps {
  metrics: Metrics;
}

export function CustomerCharts({ metrics }: CustomerChartsProps) {
  // Colors for the pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Customers by Country</CardTitle>
          <CardDescription>
            Distribution of customers across countries
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2">
          <ChartContainer
            config={{
              country: {
                label: "Country",
                color: "hsl(var(--chart-1))",
              },
              count: {
                label: "Customers",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.customersByCountry}>
                <XAxis
                  dataKey="country"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="count"
                  fill="#FF8042"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customers by Region</CardTitle>
          <CardDescription>
            Regional distribution of customer base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              region: {
                label: "Region",
                color: "hsl(var(--chart-1))",
              },
              count: {
                label: "Customers",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.customersByRegion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="region"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {metrics.customersByRegion.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="region" />}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
