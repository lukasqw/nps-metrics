"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { IndicatorData } from "@/app/interfaces/indicator-data";
import { IndicatorBox } from "@/components/shared/indicator-box";

const chartData = [
  { day: 1, nps: 80 },
  { day: 2, nps: 90 },
  { day: 3, nps: 70 },
  { day: 4, nps: 110 },
  { day: 5, nps: 105 },
  { day: 6, nps: 120 },
];
const chartConfig = {
  nps: {
    label: "nps",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const indicatorData: IndicatorData = {
  title: "Média do NPS",
  subtitle: "",
  value: 70,
  variation: -10,
  typeVariation: "percent",
};

export function NpsIndicator() {
  return (
    <IndicatorBox data={indicatorData}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData} margin={{}}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-nps)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-nps)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="nps"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-nps)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </IndicatorBox>
  );
}
