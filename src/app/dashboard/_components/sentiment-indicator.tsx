"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, sentiment: 100 },
  { day: 2, sentiment: 60 },
  { day: 3, sentiment: 70 },
  { day: 4, sentiment: 50 },
  { day: 5, sentiment: 90 },
  { day: 6, sentiment: 100 },
];
const chartConfig = {
  sentiment: {
    label: "sentiment",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const indicatorData: IndicatorData = {
  title: "Sentimento Geral",
  subtitle: "",
  value: 50,
  variation: 10,
  typeVariation: "absolute",
};

export function SentimentIndicator() {
  return (
    <IndicatorBox data={indicatorData}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData} margin={{}}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sentiment)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sentiment)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="sentiment"
              type="natural"
              fill="url(#fillValue)"
              fillOpacity={0.4}
              stroke="var(--color-sentiment)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </IndicatorBox>
  );
}
